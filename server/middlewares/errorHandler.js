export function errorHandler(err, req, res, next) {
  // Multer file-upload errors (invalid file type, size limit, etc.)
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message })
  }

  // Mongoose invalid ObjectId (e.g. GET /api/projects/abc)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id parameter' })
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }

  // JSON body-parser syntax error (malformed JSON payload)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' })
  }

  // Errors that explicitly set a status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({ message: err.message || 'Server error' })
}

