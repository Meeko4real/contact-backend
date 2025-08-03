require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: subject || "New Contact Form Message",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden;
              background-color: #1e1e1e; color: #f1f1f1; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background-color: #111; padding: 20px 20px 10px; text-align: center;">
      <h1 style="margin: 0; font-size: 26px; color: #64ffda;">𝕄𝕚𝕔𝕙𝕒𝕖𝕝 ℂ𝕙𝕦𝕜𝕨𝕦</h1>
      <p style="margin: 0; color: #bbb;">Portfolio Contact Notification</p>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">
      <h2 style="color: #00b4d8;">🚀 New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="background-color:#2c2c2c;padding:12px;border-left:4px solid #00b4d8; border-radius: 5px;">
        ${message}
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #111; padding: 15px; text-align: center; font-size: 14px;">
      <p style="color: #888; margin: 0;">📫 Sent from <strong style="color: #64ffda;">MeekoPortfolio.dev</strong></p>
      <div style="margin-top: 8px;">
        <a href="https://github.com/meeko4real" style="margin: 0 8px; color: #64ffda; text-decoration: none;">GitHub</a> |
        <a href="https://wa.me/2349042354109?text=Hi%20Meeko%2C%20I%20saw%20your%20portfolio!" style="margin: 0 8px; color: #64ffda; text-decoration: none;">WhatsApp</a> |
        <a href="mailto:meeko4real7@gmail.com" style="margin: 0 8px; color: #64ffda; text-decoration: none;">Email</a>
      </div>
    </div>
  </div>
  `
  };
  
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

