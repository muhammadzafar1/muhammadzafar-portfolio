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
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

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

  await transporter.sendMail(mailOptions);
}

export async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    await sendNotificationEmail({
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  }catch (error) {
  console.error("============== ERROR ==============");
  console.error(error);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}