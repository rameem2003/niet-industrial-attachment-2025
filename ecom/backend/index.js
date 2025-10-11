require("dotenv").config();
const express = require("express");
const app = express();
let port = process.env.PORT;

let array = [
  { id: 1, name: "Charlie", age: 25, status: "active" },
  { id: 2, name: "Bob", age: 30, status: "inactive" },
  { id: 3, name: "Diana", age: 28, status: "active" },
  { id: 4, name: "Ethan", age: 35, status: "inactive" },
  { id: 5, name: "Fiona", age: 27, status: "active" },
  { id: 6, name: "George", age: 32, status: "inactive" },
  { id: 7, name: "Hannah", age: 24, status: "active" },
  { id: 8, name: "Ian", age: 29, status: "inactive" },
  { id: 9, name: "Julia", age: 26, status: "active" },
];

app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to server",
  });
});

// single users route
app.get("/users", (req, res) => {
  //   console.log(req.headers.authorization);
  let token = req.headers.authorization.split(" ");
  console.log(token);

  let { name } = req.query;
  console.log(name);

  if (name) {
    let user = array.filter(
      (item) => item.name.toLowerCase() == name.toLowerCase()
    );
    if (user.length == 0) {
      res.status(404).send({
        success: false,
        message: "User no found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User found",
      data: user,
    });

    return;
  }

  res.status(200).send({
    success: true,
    message: "All Users found",
    data: array,
  });
});

// new user add
app.post("/users/add", (req, res) => {
  let { name, age, status } = req.body;

  array.push({ name, age, status });

  res.send({
    success: true,
    message: "New User Created",
  });
});

// user delete route
app.delete("/users/:id", (req, res) => {
  let { id } = req.params;

  // you can use findIndex and splice
  let index = array.findIndex((item) => item.id == id);
  if (index == -1) {
    res.status(404).send({
      success: false,
      message: "User not found",
    });
    return;
  }
  array.splice(index, 1);

  // also you can use filter
  let newArray = array.filter((item) => item.name.toLowerCase() != name);
  array = [];
  array = newArray;

  res.send({
    success: true,
    message: "User deleted success",
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
