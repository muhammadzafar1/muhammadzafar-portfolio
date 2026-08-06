import mongoose from 'mongoose'
import dns from 'dns'

const dnsPromises = dns.promises

dns.setDefaultResultOrder('ipv4first')
dns.setServers(['1.1.1.1', '8.8.8.8'])

async function resolveAtlasSrvUri(uri) {
  const match = uri.match(/^mongodb\+srv:\/\/([^/]+)\/(.*)$/)
  if (!match) {
    return uri
  }

  const [, credentialsAndHost, pathAndQuery] = match
  const [credentialsPart, hostPart] = credentialsAndHost.includes('@')
    ? credentialsAndHost.split('@')
    : [null, credentialsAndHost]

  const [dbName = 'admin', query = ''] = pathAndQuery.split('?')
  const params = new URLSearchParams(query)

  try {
    const srvName = `_mongodb._tcp.${hostPart}`
    const srvRecords = await dnsPromises.resolveSrv(srvName)
    const hostList = srvRecords.map((record) => `${record.name}:${record.port}`).join(',')

    try {
      const txtRecords = await dnsPromises.resolveTxt(hostPart)
      const txtValues = txtRecords.flat().join('')
      txtValues.split('&').forEach((entry) => {
        const [key, value] = entry.split('=')
        if (key && value && !params.has(key)) {
          params.set(key, value)
        }
      })
    } catch (err) {
      console.warn('MongoDB Atlas TXT lookup failed; using default connection options.', err.message)
    }

    if (!params.has('tls') && !params.has('ssl')) {
      params.set('tls', 'true')
    }
    if (!params.has('authSource')) {
      params.set('authSource', 'admin')
    }
    if (!params.has('retryWrites')) {
      params.set('retryWrites', 'true')
    }
    if (!params.has('w')) {
      params.set('w', 'majority')
    }

    const authPrefix = credentialsPart ? `${credentialsPart}@` : ''
    return `mongodb://${authPrefix}${hostList}/${dbName}?${params.toString()}`
  } catch (error) {
    console.warn('Failed to resolve MongoDB Atlas SRV records, falling back to original URI:', error.message)
    return uri
  }
}

const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not set in .env')
    }

    const resolvedUri = uri.startsWith('mongodb+srv://') ? await resolveAtlasSrvUri(uri) : uri
    const conn = await mongoose.connect(resolvedUri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection error:')
    console.error(error.message)
    if (error.code === 'ETIMEOUT' || error.message.includes('queryTxt')) {
      console.error('Atlas DNS lookup timed out. Verify network access and public DNS settings for MongoDB Atlas.')
    }
    process.exit(1)
  }
}

export default connectDb
