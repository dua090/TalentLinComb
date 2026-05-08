const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BCRYPT_SALT_ROUNDS = 10;
const JWT_EXPIRY = "7d";
const MIN_PASSWORD_LENGTH = 6;

const validateRequiredFields = (fields, res) => {
  const missingFields = Object.entries(fields)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    res.status(400).json({
      message: `${missingFields.join(", ")} are required`,
    });
    return false;
  }
  return true;
};

const validatePasswordLength = (password, res) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).json({
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    });
    return false;
  }
  return true;
};

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
};

const sanitizeUserResponse = (user) => {
  const { password, ...userData } = user._doc;
  return userData;
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateRequiredFields({ name, email, password }, res)) {
      return;
    }

    if (!validatePasswordLength(password, res)) {
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "recruiter",
    });

    const userData = sanitizeUserResponse(user);

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateRequiredFields({ email, password }, res)) {
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(user._id);
    const userData = sanitizeUserResponse(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};