const {
  userDelete,
  updateUser,
  registerUser,
  loginUser,
  verifyUser,
  resendVerificationEmail,
  updateUserPassword,
  editUserProfile,
  userProfile,
  logoutUser,
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

// single user route
// http://localhost:5000/api/auth/user
router.get("/user", checkUserMiddleware, userProfile);

// update user route
// http://localhost:5000/api/auth/users/update/:id
router.patch("/users/update/:id", updateUser);

// user delete route
// http://localhost:5000/api/auth/users/:id
router.delete("/users/:id", userDelete);

router.post("/logout", checkUserMiddleware, logoutUser);

module.exports = router;
