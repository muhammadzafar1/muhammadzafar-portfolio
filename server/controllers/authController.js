import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body || {}
    const totalStart = Date.now()

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }

    const normalizedEmail = String(email).trim().toLowerCase()

    let user = null
    let dbMs = 0
    let bcryptMs = 0
    let jwtMs = 0
    let extraMs = 0

    const dbStart = Date.now()
    console.time('[login] db')
    user = await User.findOne({ email: normalizedEmail }).select('+password name email role').lean()
    console.timeEnd('[login] db')
    dbMs = Date.now() - dbStart

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const bcryptStart = Date.now()
    console.time('[login] bcrypt')
    const isMatch = await bcrypt.compare(String(password), user.password)
    console.timeEnd('[login] bcrypt')
    bcryptMs = Date.now() - bcryptStart

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }

    const jwtStart = Date.now()
    console.time('[login] jwt')
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h'
      }
    )
    console.timeEnd('[login] jwt')
    jwtMs = Date.now() - jwtStart

    const totalMs = Date.now() - totalStart
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[login] db=${dbMs}ms bcrypt=${bcryptMs}ms jwt=${jwtMs}ms extra=${extraMs}ms total=${totalMs}ms`)
    }

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('LOGIN ERROR:', err)

    return res.status(500).json({
      message: 'Server Error'
    })
  }
}