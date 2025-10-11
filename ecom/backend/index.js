require("dotenv").config();
const express = require("express");
const app = express();
const { user, addUser, userDelete } = require("./controllers/users.controller");
const upload = require("./middleware/fileupload");

let port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));

// home route
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to server",
  });
});

// single users route
app.get("/users", user);

// new user add
app.post("/users/add", addUser);

// user delete route
app.delete("/users/:id", userDelete);

app.post("/new", upload.single("photo"), (req, res) => {
  let { name, address } = req.body;

  console.log(name, address);
  res.send("Ok");
});

// error route
// app.use((req, res) => {
//   res.send({
//     success: false,
//     message: "Route not found",
//   });
// });

app.listen(port, () => {
  console.log("server is running...");
});
