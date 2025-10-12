# Express JS Documentation Day 12

## Industrial Attachment - NIET

## Overview

- Express JS Router
- Middleware (Custom)
- Mongo DB with mongoose ODM

### Custom Middleware in Express.js

Middleware in Express.js are functions that have access to the request object (`req`), response object (`res`), and the next middleware function in the application's request-response cycle. They can execute code, modify `req` and `res` objects, end the response cycle, or call the next middleware.

Custom middleware allows you to create reusable functions for tasks like logging, error handling, or data validation.

#### Creating a Simple Custom Middleware

Here's an example of a custom middleware that logs the request method and URL:

```javascript
const express = require("express");
const app = express();

// Custom middleware function
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route handler
};

// Apply the middleware to all routes
app.use(logRequest);

// A sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **Key Points**:
  - Always call `next()` to proceed, unless you want to terminate the cycle (e.g., send a response).
  - Middleware can be applied globally (`app.use()`), to specific routes, or conditionally.
  - For error-handling middleware, add an `err` parameter: `(err, req, res, next)` and apply it last.

### Express Router

Express Router is a mini Express app that allows you to group related routes together, making your code more modular and easier to maintain. It's like a namespace for routes.

#### Basic Usage

You create a router instance and define routes on it, then mount it to the main app.

```javascript
const express = require("express");
const app = express();

// Create a router instance
const userRouter = express.Router();

// Define routes on the router
userRouter.get("/", (req, res) => {
  res.json({ message: "All users" });
});

userRouter.get("/:id", (req, res) => {
  res.json({ userId: req.params.id });
});

// Mount the router to a base path
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- **Accessing**: Routes become `/users/` and `/users/:id`.
- **Advanced Features**:
  - Chain middleware: `userRouter.use(authMiddleware).get('/profile', handler);`.
  - Nested routers: Mount one router inside another for deeper modularity.

### Introduction to MongoDB and Mongoose

MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON). Unlike relational databases, it doesn't enforce a rigid schema, but you can define schemas for structure and validation using tools like Mongoose, an Object Data Modeling (ODM) library for Node.js and MongoDB. Mongoose helps with schema definition, model creation, and performing CRUD (Create, Read, Update, Delete) operations in a more intuitive way.

To get started, ensure you have Node.js installed, then install Mongoose and the MongoDB driver:

```
npm install mongoose
```

Connect to MongoDB (assuming a local instance or MongoDB Atlas):

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### Defining Schemas in Mongoose

A **schema** defines the structure of documents in a collection, including field types, validation rules, defaults, and indexes. Schemas are not enforced by MongoDB itself but by Mongoose for your application.

Example: Schema for a "User" document.

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicates in the collection
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Regex validation
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  hobbies: [
    {
      type: String, // Array of strings
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Auto-set to current date
  },
});

// Add an index for faster queries on email
userSchema.index({ email: 1 });

// Virtuals (computed properties, not stored in DB)
userSchema.virtual("fullInfo").get(function () {
  return `${this.name} (${this.email})`;
});

// Middleware (pre/post hooks)
userSchema.pre("save", function (next) {
  console.log("About to save a user...");
  next();
});

userSchema.post("save", function (doc) {
  console.log("User saved:", doc.name);
});
```

Schemas support various types: `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array`, and nested schemas (subdocuments).

### Defining Models in Mongoose

A **model** is a compiled version of a schema that provides an interface to the database. It acts as a constructor for creating new documents and querying the collection.

Example: Creating a User model from the schema above.

```javascript
const User = mongoose.model("User", userSchema); // 'User' becomes the collection name 'users' (lowercase plural)
```

Now you can use `User` to interact with the database, e.g., `const newUser = new User({ name: 'Alice' });`.

### CRUD Operations with Mongoose Models

Mongoose makes CRUD straightforward using methods on models and document instances. Below are examples using the User model. Assume the connection is established.

#### 1. **Create** (Insert new documents)

- Use `model.create()` for single or multiple documents.

```javascript
// Create one user
const newUser = new User({
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  hobbies: ["reading", "coding"],
});
newUser
  .save() // Returns a promise
  .then((user) => console.log("Created:", user.name))
  .catch((err) => console.error("Error:", err));

// Or bulk create
User.create([
  { name: "Bob", email: "bob@example.com", age: 25 },
  { name: "Charlie", email: "charlie@example.com", age: 35 },
])
  .then((users) => console.log("Created users:", users.length))
  .catch((err) => console.error("Error:", err));
```

#### 2. **Read** (Query and retrieve documents)

- Use `model.find()`, `findOne()`, `findById()`, etc. These return Mongoose documents (with methods) or plain objects.

```javascript
// Find all users
User.find({})
  .then((users) => console.log("All users:", users))
  .catch((err) => console.error(err));

// Find by criteria
User.find({ age: { $gte: 30 } }) // Users aged 30 or older (MongoDB query syntax)
  .select("name email") // Project only these fields
  .limit(5) // Limit results
  .sort({ createdAt: -1 }) // Sort by newest first
  .then((users) => console.log("Filtered users:", users))
  .catch((err) => console.error(err));

// Find one user
User.findOne({ email: "alice@example.com" })
  .then((user) => {
    if (user) {
      console.log("Found:", user.fullInfo); // Uses the virtual
    }
  })
  .catch((err) => console.error(err));

// Find by ID (ObjectId)
User.findById("507f1f77bcf86cd799439011") // Replace with actual ID
  .then((user) => console.log(user))
  .catch((err) => console.error(err));
```

#### 3. **Update** (Modify existing documents)

- Use `model.updateOne()`, `updateMany()`, or instance methods like `document.save()` after changes.

```javascript
// Update one user
User.updateOne(
  { email: "alice@example.com" }, // Filter
  { $set: { age: 31, hobbies: ["reading", "coding", "hiking"] } } // Updates
)
  .then((result) => console.log("Updated:", result.modifiedCount))
  .catch((err) => console.error(err));

// Update with findOneAndUpdate (returns the updated document)
User.findOneAndUpdate(
  { email: "bob@example.com" },
  { $set: { age: 26 } },
  { new: true, runValidators: true } // Return updated doc, run validation
)
  .then((updatedUser) => console.log("Updated user:", updatedUser))
  .catch((err) => console.error(err));

// Instance update (fetch, modify, save)
User.findById("someId")
  .then((user) => {
    user.age = 32;
    return user.save(); // Triggers pre/post save hooks
  })
  .then((updated) => console.log("Saved:", updated.name))
  .catch((err) => console.error(err));
```

#### 4. **Delete** (Remove documents)

- Use `model.deleteOne()`, `deleteMany()`, or `document.remove()`.

```javascript
// Delete one user
User.deleteOne({ email: "charlie@example.com" })
  .then((result) => console.log("Deleted:", result.deletedCount))
  .catch((err) => console.error(err));

// Delete many
User.deleteMany({ age: { $lt: 25 } }) // All under 25
  .then((result) => console.log("Deleted:", result.deletedCount))
  .catch((err) => console.error(err));

// Instance delete
User.findById("someId")
  .then((user) => user.remove())
  .then((removed) => console.log("Removed:", removed.name))
  .catch((err) => console.error(err));
```

### Best Practices

- **Validation**: Always use `required`, `unique`, and custom validators to ensure data integrity.
- **Error Handling**: Wrap operations in try-catch or use `.catch()` for promises/async-await.
- **Async/Await**: For cleaner code, use async functions:
  ```javascript:disable-run
  async function createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
    }
  }
  ```
- **Population**: For referencing other documents (e.g., User has posts), use `ref` in schemas and `populate()` in queries.
- **Indexes**: Define them in schemas for performance on large collections.

For more advanced topics like transactions, aggregation pipelines, or geospatial queries, refer to the [Mongoose documentation](https://mongoosejs.com/docs/). If you have a specific example or error, provide more details!

```

```
