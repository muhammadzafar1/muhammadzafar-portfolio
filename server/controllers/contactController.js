import nodemailer from "nodemailer";
import Message from "../models/Message.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Only verify SMTP when credentials are actually provided
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter.verify((error) => {
    if (error) {
      console.log("SMTP Error:", error.message);
    } else {
      console.log("SMTP Server is ready");
    }
  });
}

async function sendNotificationEmail({
  name,
  email,
  subject,
  message,
  createdAt,
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS is missing in .env");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `📩 New Portfolio Contact Message - ${subject}`,

    html: `
      <h2>New Portfolio Contact Message</h2>

      <p><b>Name:</b> ${name}</p>

      <p><b>Email:</b> ${email}</p>

      <p><b>Subject:</b> ${subject}</p>

      <p><b>Message:</b></p>

      <p>${message}</p>

      <hr>

      <small>${createdAt}</small>
    `,
  };

  console.log("📤 Sending notification email...");
  console.log("   To:", mailOptions.to);
  console.log("   Subject:", mailOptions.subject);

  await transporter.sendMail(mailOptions);

  console.log("✅ Notification email sent successfully");
}

export async function submitContact(req, res) {
  console.log("========== CONTACT DEBUG ==========");
  console.log("Received contact request at:", new Date().toISOString());
  console.log("Body:", JSON.stringify(req.body));

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    console.log("❌ Missing required fields");
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  console.log("Persisting message to MongoDB...");

  // Always persist the contact message first
  const newMessage = await Message.create({
    name,
    email,
    subject,
    message,
  });

  console.log("✅ Message saved to DB with id:", newMessage._id);

  // Email notification is best-effort: if SMTP fails (e.g. not configured
  // on Railway yet), the contact message is still saved and the visitor
  // still gets a success response. The error is logged, not fatal.
  try {
    await sendNotificationEmail({
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
    });
  } catch (emailError) {
    console.error("Contact notification email failed:", emailError.message);
  }

  console.log("📨 Responding success to client");
  res.status(200).json({
    success: true,
    message: "Message sent successfully.",
  });
}

export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}

