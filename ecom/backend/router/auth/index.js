const {
  user,
  addUser,
  userDelete,
} = require("../../controllers/users.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");

const router = require("express").Router();

// single users route
// http://localhost:5000/api/auth/users
router.get("/users", checkUserMiddleware, user);

// new user add
// http://localhost:5000/api/auth/users/add
router.post("/users/add", addUser);

// user delete route
// http://localhost:5000/api/auth/users/:id
router.delete("/users/:id", userDelete);

module.exports = router;
