import dotenv from "dotenv";
import Message from "../models/Message.js";
import { sendContactEmail } from "../utils/sendEmail.js";

dotenv.config();

async function sendNotificationEmail({
  messageId,
  name,
  email,
  subject,
  message,
}) {
  try {
    console.log("📤 Sending notification email for message:", messageId);
    await sendContactEmail({ name, email, subject, message });

    await Message.findByIdAndUpdate(messageId, {
      status: "sent",
      emailError: null,
    });

    console.log("✅ Notification email sent successfully for message:", messageId);
  } catch (error) {
    await Message.findByIdAndUpdate(messageId, {
      status: "failed",
      emailError: error?.message || "Unknown email error",
    });

    console.error("Contact notification email failed:", error?.message || error);
  }
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

  const newMessage = await Message.create({
    name,
    email,
    subject,
    message,
    status: "pending",
  });

  console.log("✅ Message saved to DB with id:", newMessage._id);

  res.status(200).json({
    success: true,
    message: "Message sent successfully.",
  });

  void sendNotificationEmail({
    messageId: newMessage._id,
    name: newMessage.name,
    email: newMessage.email,
    subject: newMessage.subject,
    message: newMessage.message,
  });
}

export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}

