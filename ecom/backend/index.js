require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router");
const connectDb = require("./config/db.config");
connectDb();

let port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
app.use(router);

// home route
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to server",
  });
});

// error route
app.use((req, res) => {
  res.send({
    success: false,
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log("server is running...");
});
