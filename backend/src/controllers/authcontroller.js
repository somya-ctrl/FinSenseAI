const {
  signupService,
  loginService,
  googleAuthService,
} = require("../services/authService");

// ==========================
// SIGNUP CONTROLLER
// ==========================
const signup = async (req, res) => {
  try {
    const result = await signupService(req.body);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// LOGIN CONTROLLER
// ==========================
const login = async (req, res) => {
  try {
    const result = await loginService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GOOGLE AUTH CONTROLLER
// ==========================
const googleAuth = async (req, res) => {
  try {
    const result = await googleAuthService(req.body);

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      ...result,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Google authentication failed",
    });
  }
};

module.exports = {
  signup,
  login,
  googleAuth,
};