# Express JS Documentation Day 10

## Industrial Attachment - NIET

## Overview

- Express App
- Route Handling
- Invalid Route
- Server Side error route
- Express JS built in middleware

# Express.js Lecture: Getting Started with Routing and Error Handling

Welcome to this introductory lecture on Express.js! Express is a fast, unopinionated, minimalist web framework for Node.js that makes building web applications and APIs straightforward. Today, we'll focus on the fundamentals: creating an Express app, defining routes, handling 404 (not found) errors, and implementing error middleware. We'll build a simple example step by step.

This lecture assumes you have Node.js installed (version 14 or later recommended). If not, download it from [nodejs.org](https://nodejs.org). Let's dive in!

## 1. Creating an Express App

To start, you'll need to set up a new project and install Express.

### Step 1: Initialize Your Project

Open your terminal in a new directory and run:

```
npm init -y
```

This creates a `package.json` file.

### Step 2: Install Express

```
npm install express
```

### Step 3: Create Your First App

Create a file called `app.js` (or `index.js`) and add the following code:

```javascript
const express = require("express"); // Import Express (CommonJS style)
const app = express(); // Create an instance of the Express application

const PORT = process.env.PORT || 3000; // Set port, default to 3000

// Basic server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

- **Explanation**:
  - `require('express')`: Loads the Express module.
  - `express()`: Initializes a new app instance.
  - `app.listen()`: Starts the HTTP server and listens on the specified port.

Run it with `node app.js`, and you'll see "Server is running..." in the console. Visit `http://localhost:3000` in your browser—it should show a blank page (no routes yet!).

**Pro Tip**: For modern ES modules, use `import express from 'express';` and add `"type": "module"` to your `package.json`.

## 2. Creating Routes

Routes define how your app responds to client requests at specific endpoints (URLs). Express uses HTTP methods like GET, POST, PUT, DELETE.

### Basic GET Route

Add this to your `app.js` before `app.listen()`:

```javascript
// GET route for the root path
app.get("/", (req, res) => {
  res.send("Hello, Express World!");
});
```

- **Explanation**:
  - `app.get(path, callback)`: Handles GET requests to `/`.
  - `req`: Request object (client data).
  - `res`: Response object (server reply).
  - `res.send()`: Sends a response.

Restart your server (`node app.js`) and refresh `http://localhost:3000`—you'll see "Hello, Express World!".

### More Routes: Parameters and Multiple Methods

Let's add a route with a URL parameter (e.g., `/users/:id`) and a POST route.

```javascript
// GET route with parameter
app.get("/users/:id", (req, res) => {
  const userId = req.params.id; // Access the :id parameter
  res.send(`User profile for ID: ${userId}`);
});

// POST route (requires body-parser or Express 4.16+ built-in)
app.use(express.json()); // Middleware to parse JSON bodies (add this early in your app)

app.post("/users", (req, res) => {
  const newUser = req.body; // Access JSON from request body
  res.json({ message: "User created", user: newUser });
});
```

- **Explanation**:
  - `:id` is a route parameter—captured in `req.params`.
  - `app.use(express.json())`: Middleware to handle JSON payloads.
  - `res.json()`: Sends JSON response.

Test the GET: Visit `/users/123` → "User profile for ID: 123".

For POST, use a tool like Postman or curl: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/users`.

**Lecture Note**: Routes are matched in order—place more specific ones first to avoid mismatches.

## 3. Not Found Route (404 Handler)

What if someone visits `/nonexistent`? Express doesn't auto-handle 404s, so we add a catch-all route at the **end** of your route definitions.

Add this after all other routes, before middleware:

```javascript
// 404 Handler (must be after all routes)
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});
```

- **Explanation**:
  - `app.use()`: Applies to all HTTP methods (like a wildcard route).
  - `res.status(404)`: Sets HTTP status code.
  - Place it last—Express processes routes top-to-bottom.

Now, visit `/oops` → You'll get a 404 message.

**Best Practice**: In production, log the requested URL for debugging: `console.log(`404: ${req.originalUrl}`);`.

## 4. Error Middleware

Errors can occur anywhere (e.g., database issues, invalid params). Error middleware catches and handles them gracefully.

### Basic Error Handler

Add this **last** in your app (after the 404 handler):

```javascript
// Error-handling middleware (signature: err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).json({ error: "Something went wrong!" });
});
```

- **Explanation**:
  - Four parameters: `err` makes it an error handler.
  - Call `next(err)` in other middleware/routes to pass errors here.
  - `res.status(500)`: Internal Server Error.

### Example: Throwing an Error in a Route

Update your `/users/:id` route to simulate an error:

```javascript
app.get("/users/:id", (req, res, next) => {
  const userId = req.params.id;
  if (userId === "error") {
    const err = new Error("User not found");
    return next(err); // Pass error to middleware
  }
  res.send(`User profile for ID: ${userId}`);
});
```

Visit `/users/error` → You'll see the error JSON and a console log.

**Advanced Tip**: For async routes, use `try/catch` and call `next(err)`. Express 5+ will have built-in async support.

## Full Example Code

Here's your complete `app.js`:

```javascript
const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express World!");
});

app.get("/users/:id", (req, res, next) => {
  const userId = req.params.id;
  if (userId === "error") {
    const err = new Error("User not found");
    return next(err);
  }
  res.send(`User profile for ID: ${userId}`);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  res.json({ message: "User created", user: newUser });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Run `node app.js` and test away!

# Express.js Lecture: Built-in Middleware

Hello again! In the previous lecture, we touched on middleware briefly when we used `express.json()` to parse request bodies. Middleware is a key concept in Express—it's essentially a function that has access to the request (`req`), response (`res`), and the next middleware function in the stack (`next`). Middleware can modify the request/response objects, end the response cycle, or pass control to the next function.

Express provides several **built-in middleware functions** that handle common tasks like parsing request bodies or serving static files. These were introduced or consolidated in Express 4.16.0+, replacing the need for external packages like `body-parser` for basic use cases. (Prior to that, some were part of Connect or separate modules.) Let's break them down one by one, with usage examples. We'll update our `app.js` from the last lecture to demonstrate.

**Important Note**: These middleware functions are added using `app.use()`, typically early in your app setup. They process requests before routes (unless mounted on a path).

## 1. `express.json([options])` - Parse JSON Request Bodies

This middleware parses incoming requests with JSON payloads, populating `req.body` with the parsed object. It only processes requests where the `Content-Type` header matches (default: `application/json`). It supports gzip/deflate decompression and handles Unicode.

**Key Options** (passed as an object):
| Option | Description | Type | Default |
|----------|-------------|------|---------|
| `inflate` | Handle compressed bodies? | Boolean | `true` |
| `limit` | Max body size (e.g., `"1mb"` or `1024`) | String/Number | `"100kb"` |
| `strict` | Only accept arrays/objects? | Boolean | `true` |
| `type` | MIME type to match (string, array, or function) | Mixed | `"application/json"` |

**Example**:

```javascript
app.use(express.json({ limit: "10kb", strict: false }));
```

In our POST `/users` route, `req.body` is already using this—try sending oversized JSON to see the limit in action!

**Security Tip**: Always validate `req.body`—it's user-controlled input.

## 2. `express.urlencoded([options])` - Parse URL-Encoded Bodies

Similar to JSON, but for `application/x-www-form-urlencoded` payloads (common in HTML forms). Populates `req.body` as key-value pairs. Supports only UTF-8.

**Key Options**:
| Option | Description | Type | Default |
|-----------|-------------|------|---------|
| `extended` | Use `qs` library for rich objects/arrays? (`true`) or `querystring` for simple? (`false`) | Boolean | `true` |
| `limit` | Max body size | String/Number | `"100kb"` |
| `type` | MIME type to match | Mixed | `"application/x-www-form-urlencoded"` |

**Example**:

```javascript
app.use(express.urlencoded({ extended: true })); // Allows nested objects
```

Add this to your app (after `express.json()` for stacking). Test with a form: `curl -X POST -d "name=Bob&age=30" http://localhost:3000/users`.

## 3. `express.text([options])` - Parse Text Request Bodies

Parses bodies as plain strings (e.g., `text/plain`). Populates `req.body` as a string. Useful for custom text formats.

**Key Options**:
| Option | Description | Type | Default |
|-----------------|-------------|------|---------|
| `defaultCharset` | Fallback charset if not specified | String | `"utf-8"` |
| `limit` | Max body size | String/Number | `"100kb"` |
| `type` | MIME type to match | Mixed | `"text/plain"` |

**Example**:

```javascript
app.use(express.text({ type: "text/*" })); // Match any text type
```

Add a route: `app.post('/message', (req, res) => res.send(`Echo: ${req.body}`));`. Send plain text via curl: `curl -X POST -d "Hello!" http://localhost:3000/message`.

## 4. `express.raw([options])` - Parse Raw Buffer Bodies

Treats the body as a raw Buffer (binary data). No parsing—just the raw bytes in `req.body`. Great for file uploads or custom binary protocols.

**Key Options**:
| Option | Description | Type | Default |
|----------|-------------|------|---------|
| `inflate` | Handle compressed bodies? | Boolean | `true` |
| `limit` | Max body size | String/Number | `"100kb"` |
| `type` | MIME type to match | Mixed | `"application/octet-stream"` |

**Example**:

```javascript
app.use(express.raw({ type: "*/*" })); // Match anything
```

Route example: `app.post('/upload', (req, res) => res.send(`Received ${req.body.length} bytes`));`.

**Pro Tip**: Stack these carefully—use only one body parser per request to avoid conflicts.

## 5. `express.static(root, [options])` - Serve Static Files

Serves files directly from a directory (e.g., CSS, images, HTML). No processing—just sends the file if found; otherwise, calls `next()`.

**Key Options**:
| Option | Description | Type | Default |
|--------------|-------------|------|---------|
| `dotfiles` | Handle hidden files? (`"allow"`, `"deny"`, `"ignore"`) | String | `"ignore"` |
| `maxAge` | Cache duration (ms or string) | Number/String | `0` |
| `index` | Default index file | String/Boolean | `"index.html"` |
| `redirect` | Redirect to trailing `/` for directories? | Boolean | `true` |

**Example**:

```javascript
app.use(express.static("public", { maxAge: "1d" })); // Serve from 'public' folder, cache for 1 day
```

Create a `public` folder with an `index.html` file, then visit `http://localhost:3000/`—it'll serve the static file instead of your root route!

For performance, use a reverse proxy like Nginx in production.

## Updated `app.js` with Built-in Middleware

Here's your app with all of them (comment out extras as needed):

```javascript
const express = require("express");
const app = express();

// Built-in middleware (order matters: parsers first, then static)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.raw());

// Serve static files
app.use(express.static("public"));

// Routes (after middleware)
app.get("/", (req, res) => {
  res.send("Hello from routes!");
});

app.post("/users", (req, res) => {
  res.json({ received: req.body });
});

// ... (other routes, 404, error handler as before)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## When to Use Third-Party Middleware?

Built-in ones cover basics, but for advanced needs (e.g., CORS, compression, authentication), install packages like `cors`, `compression`, or `helmet` via npm.

## Homework

- Add `express.static` and serve a simple HTML/CSS page.
- Experiment with options: Send a large JSON payload and handle the error.
- Read about stacking middleware pitfalls in the docs.

Questions? Let's discuss. Next up: Custom middleware! Keep building! 🌐
