const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

const mail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: '"NIET" <rameem.me@gmail.com>',
    to,
    subject,
    // text: "Hello world?", // plain‑text body
    html, // HTML body
  });
  console.log("Message sent:", info.messageId);
};

module.exports = mail;
