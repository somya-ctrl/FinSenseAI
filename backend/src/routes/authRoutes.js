const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  googleAuth,
  logout
} = require("../controllers/authcontroller");
const protect = require("../middleware/authMiddleware"); 

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/logout", protect, logout);

module.exports = router;