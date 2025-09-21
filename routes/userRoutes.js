// // routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getProfile,
//   getAdminData,
//   uploadProfilePic,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/userController");
// const auth = require("../middleware/auth");
// const role = require("../middleware/role");
// const upload = require("../middleware/upload");

// // public
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// //reset password
// router.post("/forgot-password", forgotPassword);
// router.put("/reset-password/:token", resetPassword);

// //crud operations
// router.get("/", auth, role(["admin"]), getAllUsers);
// router.get("/profile", auth, getProfile); // <-- move this above :id
// router.get("/:id", auth, role(["admin"]), getUserById);
// router.put("/update/:id", auth, role(["admin"]), updateUser);
// router.delete("/delete/:id", auth, role(["admin"]), deleteUser);

// // protected routes
// router.get("/profile", auth, getProfile);
// router.get("/admin", auth, role(["admin"]), getAdminData);
// router.post("/:id/upload", upload.single("profilePic"), uploadProfilePic);
// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getAdminData,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  createUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const upload = require("../middleware/upload"); // Multer configuration

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Protected User Routes
router.get("/profile", auth, getProfile);
router.put(
  "/update/profile",
  auth,
  upload.single("profilePic"),
  updateUserProfile
); // New profile update route

// Protected Admin Routes
router.get("/", auth, role(["admin"]), getAllUsers);
router.post("/create", auth, role(["admin"]), createUser); // New route for admin to create users
router.get("/:id", auth, role(["admin"]), getUserById);
router.put("/update/:id", auth, role(["admin"]), updateUser);
router.delete("/delete/:id", auth, role(["admin"]), deleteUser);
router.get("/admin", auth, role(["admin"]), getAdminData);

module.exports = router;
