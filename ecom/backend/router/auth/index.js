const {
  user,
  addUser,
  userDelete,
  singleUser,
  updateUser,
} = require("../../controllers/users.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");

const router = require("express").Router();

// All users route
// http://localhost:5000/api/auth/users
router.get("/users", checkUserMiddleware, user);

// single user route
// http://localhost:5000/api/auth/users/:id
router.get("/users/:id", checkUserMiddleware, singleUser);

// update user route
// http://localhost:5000/api/auth/users/update/:id
router.patch("/users/update/:id", updateUser);

// new user add
// http://localhost:5000/api/auth/users/add
router.post("/users/add", addUser);

// user delete route
// http://localhost:5000/api/auth/users/:id
router.delete("/users/:id", userDelete);

module.exports = router;
