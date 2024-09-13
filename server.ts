// server.ts
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const app = express();

const OAuth2 = google.auth.OAuth2;

// Replace with your OAuth2 credentials
const CLIENT_ID = "your-google-client-id";
const CLIENT_SECRET = "your-google-client-secret";
const REFRESH_TOKEN = "your-google-refresh-token";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

app.use(bodyParser.json());

// Configure the mail transporter (using Gmail for example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password", // Use App Passwords for security
  },
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "your-email@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: email, // Sender address (user's email)
      to: "your-email@gmail.com", // Receiver's email (your email)
      subject: `New contact from ${name}`,
      text: `Message from ${name} (${email}):\n\n${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result);
    res.send();
  } catch (error) {
    console.log("Error sending email:", error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
