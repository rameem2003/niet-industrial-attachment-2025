# Ecommerce Project Documentation Day 15 (Followup class 15)

## Industrial Attachment - NIET

## Overview

- Verify email
- Resend email verification
- Update User Password (Check ECOM Folder Code)

### Implementing Email Verification in MERN Stack Authentication

Email verification is a crucial part of user authentication in a MERN (MongoDB, Express, React, Node.js) application. It ensures users confirm their email address before accessing full features. We'll use **Nodemailer** for sending emails, **JWT** for generating secure verification tokens, and MongoDB for storing user data.

This guide assumes you have a basic MERN auth setup (e.g., user registration with bcrypt for passwords, JWT for login). If not, start with a simple user model in Mongoose.

#### Prerequisites

- Install dependencies:
  ```bash
  npm install nodemailer jsonwebtoken bcryptjs mongoose dotenv
  ```
- Set up environment variables in `.env`:
  ```
  EMAIL_USER=your-email@gmail.com  # Gmail or other SMTP
  EMAIL_PASS=your-app-password     # Use app password for Gmail
  JWT_SECRET=your-jwt-secret
  MONGO_URI=your-mongodb-uri
  ```
- User Model (in `models/User.js`): Add an `isVerified` field and `verificationToken`.

  ```javascript
  const mongoose = require("mongoose");
  const bcrypt = require("bcryptjs");

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
  });

  userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

  module.exports = mongoose.model("User", userSchema);
  ```

Now, let's break it down step by step.

#### 1. Send Verification Email Using Nodemailer

On user signup, generate a JWT token (with email and expiry), save it to the user document, and send an email with a verification link.

**Backend Code (in `routes/auth.js` or similar)**:

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User exists" });

    const user = new User({ email, password });

    // Generate verification token (JWT with 24h expiry)
    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // Set up Nodemailer transporter (Gmail example)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify Your Email",
      html: `
        <h1>Email Verification</h1>
        <p>Click <a href="http://localhost:3000/verify-email/${verificationToken}">here</a> to verify your email.</p>
        <p>This link expires in 24 hours.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ msg: "User created. Check email for verification." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
```

- **How it works**: After saving the user, we create a transporter and send HTML email with a link to `/verify-email/:token` (handled in frontend or backend route).
- **Security Note**: Use a production SMTP like SendGrid for scalability. The token includes only the email to minimize exposure.
- **Frontend (React)**: Call this API on signup form submit using Axios/Fetch.

#### 2. Verify Email

When the user clicks the link, the backend verifies the token, checks expiry, and updates the user's `isVerified` status.

**Backend Code (add to `routes/auth.js`)**:

```javascript
// Verify email route
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Mark as verified and clear token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.json({ msg: "Email verified successfully!" });
  } catch (err) {
    res.status(400).json({ msg: "Token verification failed" });
  }
});
```

- **How it works**: The route decodes the JWT, finds the matching user, checks if the token hasn't expired, then updates the user.
- **Frontend Handling**: Redirect to a success page after API call. Protect routes (e.g., dashboard) by checking `isVerified` in middleware:
  ```javascript
  // Middleware example
  const requireVerification = (req, res, next) => {
    if (!req.user.isVerified)
      return res.status(401).json({ msg: "Email not verified" });
    next();
  };
  ```
- **Error Handling**: If invalid, show a message like "Link expired. Please resend verification."

#### 3. Resend Email Verification

Allow users to request a new email if not verified (e.g., via a button on login page).

**Backend Code (add to `routes/auth.js`)**:

```javascript
// Resend verification route (protect with login middleware if needed)
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ msg: "Already verified" });

    // Generate new token
    const newToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    user.verificationToken = newToken;
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // Send email (reuse transporter from step 1)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Resend: Verify Your Email",
      html: `
        <h1>Email Verification (Resent)</h1>
        <p>Click <a href="http://localhost:3000/verify-email/${newToken}">here</a> to verify your email.</p>
        <p>This link expires in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "Verification email resent. Check your inbox." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
```

- **How it works**: Fetch user by email, regenerate token if not verified, and resend. Rate-limit this in production (e.g., one per hour).
- **Frontend (React)**: Add a form/button that calls this API, e.g., "Resend Verification" on login if `isVerified` is false.

#### Additional Tips

- **Testing**: Use tools like Mailtrap.io for fake SMTP testing to avoid spamming real emails.
- **Frontend Integration**: In React, use `react-router-dom` for handling the verification redirect. Store user state in Redux/Context to check `isVerified`.
- **Security Enhancements**:
  - Add rate limiting (e.g., `express-rate-limit`).
  - Use HTTPS in production.
  - Expire tokens properly and invalidate old ones on resend.
- **Common Issues**:
  - Gmail blocks less secure apps: Enable 2FA and use app passwords.
  - Token expiry: Adjust `expiresIn` as needed.
  - CORS: Ensure your Express app allows frontend origin.

This setup provides a complete, secure flow. If you need full repo code or troubleshooting for a specific part, provide more details!
