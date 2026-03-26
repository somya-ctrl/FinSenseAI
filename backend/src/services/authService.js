const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==========================
// HELPER: GENERATE JWT
// ==========================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==========================
// NORMAL SIGNUP SERVICE
// ==========================
const signupService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  };
};

// ==========================
// NORMAL LOGIN SERVICE
// ==========================
const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error(
      "This account was created with Google. Please continue with Google."
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  };
};

// ==========================
// GOOGLE AUTH SERVICE
// ==========================
const googleAuthService = async ({ credential }) => {
  if (!credential) {
    throw new Error("Google credential missing");
  }

  // Verify Google token
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    sub: googleId,
    name,
    email,
    picture,
    email_verified,
  } = payload;

  if (!email_verified) {
    throw new Error("Google email is not verified");
  }

  let user = await User.findOne({ email });

  if (!user) {
    // SIGNUP
    user = await User.create({
      name,
      email,
      googleId,
      avatar: picture,
    });
  } else {
    // LOGIN
    if (!user.googleId) {
      user.googleId = googleId;
    }

    if (!user.avatar) {
      user.avatar = picture;
    }

    await user.save();
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  };
};


const logoutService = async (user) => {
  try {
    return {
      success: true,
      message: "Logged out successfully",
      data: {
        userId: user.id || user._id || null,
        email: user.email || null,
      },
    };
  } catch (error) {
    throw new Error("Logout failed");
  }
};


module.exports = {
  signupService,
  loginService,
  googleAuthService,
  logoutService
};
