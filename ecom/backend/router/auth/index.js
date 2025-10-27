const {
  user,
  addUser,
  userDelete,
  singleUser,
  updateUser,
  registerUser,
  loginUser,
  verifyUser,
  resendVerificationEmail,
  updateUserPassword,
  editUserProfile,
} = require("../../controllers/users.controller");
const checkUserMiddleware = require("../../middleware/checkUserMiddleware");
const createUploadMiddleware = require("../../middleware/fileupload");
const upload = createUploadMiddleware({ type: "profile" });

const router = require("express").Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// verify user
router.get("/verify", verifyUser);

// resend email
router.post("/resend", resendVerificationEmail);

// update user password
router.post("/update-password", checkUserMiddleware, updateUserPassword);

// update user profile
router.patch(
  "/profile-update",
  checkUserMiddleware,
  upload.single("image"),
  editUserProfile
);

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
