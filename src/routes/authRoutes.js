const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { register, login, profile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, profile)

module.exports = router;