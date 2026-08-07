import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body || {}

    console.log("========== LOGIN DEBUG ==========")
    console.log("Entered Email:", email)

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

console.log("Entered Email:", email);
console.log("Normalized Email:", normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail })
    console.log("User:", user);

    console.log("User Found:", user ? "YES" : "NO")

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }
    console.log("Entered Password:", password);
console.log("Stored Hash:", user.password);

    console.log("Database Email:", user.email)
    console.log("Database Role:", user.role)
    console.log("Entered Password:", password)
    console.log("Password Hash:", user.password)

    const isMatch = await bcrypt.compare(password, user.password)

  console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    console.log("✅ Login Successful")

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h"
      }
    )

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
    console.error("LOGIN ERROR:", err)

    return res.status(500).json({
      message: "Server Error"
    })
  }
}