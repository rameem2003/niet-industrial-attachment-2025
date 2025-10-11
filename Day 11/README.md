# Express JS Documentation Day 11

## Industrial Attachment - NIET

## Overview

- Express JS Form Data
- Static Files Serve
- MVC Pattern

### Receiving Form Data in Express.js

Express.js handles form data (like POST requests from HTML forms) using middleware like `body-parser` or the built-in `express.urlencoded()`. This parses incoming request bodies into `req.body`.

#### Steps:

1. Install required packages (if not already): `npm install express body-parser` (Note: `body-parser` is now included in Express 4.16+ as `express.urlencoded()` and `express.json()`).
2. Set up the middleware.
3. Access data via `req.body` in your route handler.

#### Example Code:

```javascript
const express = require("express");
const app = express();

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email } = req.body; // Extract form fields
  console.log("Received:", { name, email });
  res.send(`Hello, ${name}! Your email is ${email}.`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

- **For multipart/form-data** (e.g., file uploads): Use `multer` middleware.

  - Install: `npm install multer`.
  - Example:

    ```javascript
    const multer = require("multer");
    const upload = multer({ dest: "uploads/" });

    app.post("/upload", upload.single("file"), (req, res) => {
      res.send(`File uploaded: ${req.file.filename}`);
    });
    ```

### Serving Static Files and Assets in Express.js

Static files (e.g., CSS, JS, images) are served directly without processing. Use `express.static()` middleware to expose a directory.

#### Steps:

1. Place assets in a public folder (e.g., `public/`).
2. Mount the middleware with the path.

#### Example Code:

```javascript
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Now, /styles.css will serve public/styles.css
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000);
```

- **Assets like CSS/JS**: Link them in HTML as `<link rel="stylesheet" href="/styles.css">`.
- **Multiple directories**: Chain middleware, e.g., `app.use('/assets', express.static('assets'));`.

### Middleware in Express.js

Middleware are functions that process requests/responses in sequence. They can modify `req`/`res`, end the cycle, or pass to the next.

#### Types:

- **Built-in**: `express.json()`, `express.static()`.
- **Custom**: Functions like `(req, res, next) => { ... }`.
- **Third-party**: `morgan` for logging.

#### Example:

```javascript
const express = require("express");
const app = express();

// Custom middleware: Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Pass to next middleware/route
});

// Error-handling middleware (always last)
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

// Route after middleware
app.get("/user", (req, res) => {
  res.send("User data");
});
```

- **Order matters**: Middleware runs top-to-bottom.

### MVC Pattern in Express.js

Express.js doesn't enforce MVC (Model-View-Controller) but it's commonly used for structure:

- **Model**: Handles data (e.g., database via Mongoose/Sequelize).
- **View**: Templates (e.g., EJS, Pug) or static HTML.
- **Controller**: Routes/logic bridging Model and View.

#### Folder Structure:

```
app/
├── models/     # Database schemas
├── views/      # Templates
├── controllers/# Route handlers
├── routes/     # Route definitions
└── public/     # Static assets
```

#### Example Implementation:

1. **Model** (e.g., using Mongoose for MongoDB):

   ```javascript
   // models/User.js
   const mongoose = require("mongoose");
   const userSchema = new mongoose.Schema({ name: String, email: String });
   module.exports = mongoose.model("User", userSchema);
   ```

2. **Controller**:

   ```javascript
   // controllers/userController.js
   const User = require("../models/User");

   exports.createUser = (req, res) => {
     const user = new User(req.body);
     user.save().then(() => res.send("User created!"));
   };

   exports.getUsers = (req, res) => {
     User.find().then((users) => res.render("users", { users }));
   };
   ```

3. **View** (EJS example):

   ```html
   <!-- views/users.ejs -->
   <ul>
     <% users.forEach(user => { %>
     <li><%= user.name %> - <%= user.email %></li>
     <% }); %>
   </ul>
   ```

4. **Routes**:

   ```javascript
   // routes/users.js
   const express = require("express");
   const router = express.Router();
   const userController = require("../controllers/userController");

   router.post("/users", userController.createUser);
   router.get("/users", userController.getUsers);

   module.exports = router;
   ```

5. **App Setup**:
   ```javascript
   const express = require("express");
   const app = express();
   app.set("view engine", "ejs"); // For views
   app.use("/users", require("./routes/users")); // Mount routes
   app.listen(3000);
   ```

### File Upload with Multer in Express.js

Multer is a popular Node.js middleware for handling `multipart/form-data` (e.g., file uploads from HTML forms). It integrates seamlessly with Express.js and supports disk storage, memory storage, file validation, and more. It's essential for scenarios like image uploads, document handling, or any form with files.

#### Why Multer?

- Parses multipart forms (unlike `express.urlencoded()` which only handles non-file forms).
- Configurable: Limits file size, filters by type/mime, renames files.
- Storage: Save to disk, buffer in memory, or upload to cloud (e.g., AWS S3 with adapters).

#### Installation

Run in your project directory:

```
npm install multer
```

#### Basic Setup

1. **Import and Configure Multer**:

   - Use `multer.diskStorage()` for saving to disk.
   - Define filename generation to avoid overwrites (e.g., timestamp + original name).

2. **HTML Form Example** (for testing):
   ```html
   <!-- upload.html -->
   <form action="/upload" method="post" enctype="multipart/form-data">
     <input type="file" name="avatar" accept="image/*" required />
     <button type="submit">Upload</button>
   </form>
   ```

#### Example: Single File Upload

Here's a complete Express.js app for uploading a single file (e.g., image) to a `/uploads` folder.

```javascript
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// Ensure uploads directory exists (create it manually or via fs.mkdir)
const uploadDir = path.join(__dirname, "uploads");

// Configure storage: Save to disk with unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 'null' for no error
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // e.g., 1697123456789-123456789-image.jpg
  },
});

// File filter: Only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject
  }
};

// Initialize multer with limits and config
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter,
});

// Serve static files (to view uploaded images)
app.use("/uploads", express.static(uploadDir));

// Route for upload
app.post("/upload", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded or upload failed.");
  }
  res.send(
    `File uploaded successfully: ${req.file.filename}. View at <a href="/uploads/${req.file.filename}">/uploads/${req.file.filename}</a>`
  );
});

// Serve the upload form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

- **How it works**:
  - `upload.single('avatar')`: Handles one file from the form field named `avatar`.
  - `req.file`: Contains uploaded file details (e.g., `filename`, `path`, `mimetype`, `size`).
  - Errors (e.g., size limit exceeded) are handled via Multer's error events or in the route.

#### Multiple Files Upload

For uploading multiple files from the same field (e.g., multiple images):

```javascript
// In your multer config (same as above)
app.post("/upload-multiple", upload.array("photos", 3), (req, res) => {
  // Up to 3 files from 'photos' field
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const fileNames = req.files.map((file) => file.filename);
  res.send(`Uploaded files: ${fileNames.join(", ")}`);
});
```

- HTML: `<input type="file" name="photos" multiple accept="image/*">`

#### Fields Upload (Mixed Files + Form Data)

For forms with both files and text fields:

```javascript
app.post(
  "/profile",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "documents", maxCount: 2 },
  ]),
  (req, res) => {
    const avatar = req.files["avatar"] ? req.files["avatar"][0].filename : null;
    const docs = req.files["documents"]
      ? req.files["documents"].map((d) => d.filename)
      : [];
    const name = req.body.name; // Text field
    res.send(
      `Profile: Name=${name}, Avatar=${avatar}, Docs=${docs.join(", ")}`
    );
  }
);
```

- `req.files`: Object with arrays per field name.
- `req.body`: Parsed text fields (requires `app.use(express.urlencoded({ extended: true }))`).

#### Memory Storage (No Disk Write)

For buffering files in memory (e.g., process without saving):

```javascript
const storage = multer.memoryStorage(); // Buffers in req.file.buffer

const upload = multer({ storage: storage });
app.post("/process", upload.single("file"), (req, res) => {
  // Access buffer: req.file.buffer
  // e.g., Resize image with sharp: const sharp = require('sharp'); sharp(req.file.buffer).resize(200).toFile('output.jpg');
  res.send("File processed in memory!");
});
```

#### Error Handling

Add a global error handler for Multer errors:

```javascript
// After multer routes
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File too large!");
    }
    // Handle other codes: 'LIMIT_FILE_COUNT', 'LIMIT_UNEXPECTED_FILE', etc.
  }
  res.status(500).send(error.message);
});
```

#### Best Practices

- **Security**: Always validate/filter files (mime type, size). Scan for viruses if production.
- **Limits**: Set `limits: { fileSize: 10 * 1024 * 1024 }` to prevent DoS.
- **Cloud Integration**: Use `multer-s3` for AWS S3: `npm install multer-s3`.
- **Progress Tracking**: For large files, use `multer` with `busboy` or add progress via sockets.
- **Testing**: Use Postman or curl: `curl -F "avatar=@image.jpg" http://localhost:3000/upload`.

For more advanced configs, check the [Multer docs](https://github.com/expressjs/multer). If integrating with MVC, place upload logic in controllers and ensure routes are protected (e.g., auth middleware). Let me know if you need examples for specific storage or cloud uploads!
