// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getAdminData,
  uploadProfilePic,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const upload = require("../middleware/upload");

// public
router.post("/register", registerUser);
router.post("/login", loginUser);

//crud operations
router.get("/", auth, role(["admin"]), getAllUsers);
router.get("/profile", auth, getProfile); // <-- move this above :id
router.get("/:id", auth, role(["admin"]), getUserById);
router.put("/update/:id", auth, role(["admin"]), updateUser);
router.delete("/delete/:id", auth, role(["admin"]), deleteUser);

// protected routes
router.get("/profile", auth, getProfile);
router.get("/admin", auth, role(["admin"]), getAdminData);
router.post("/:id/upload", upload.single("profilePic"), uploadProfilePic);
module.exports = router;
