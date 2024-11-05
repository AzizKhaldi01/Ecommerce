const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { verifyToken } = require("../../utils/auth");

// Function to hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Register a new user
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, image } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    user = new User({
      name,
      email,
      image,
      password: hashedPassword, // Store the hashed password
    });
    await user.save();
    const payload = {
      user: {
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login user
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.roles,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.json({
      token: token,
      user: {
        email: user.email,
        name: user.name,
        roles: user.roles,
        image: user.image,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// get user data
const GetUserInfoByToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  const { user } = verifyToken(token);
  const userData = await User.findById(user.id).select("-password -_id -__v");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(userData);
};

// put user data
const updateUser = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    const { user } = verifyToken(token);

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    console.log(user);

    const updatedUser = await User.findByIdAndUpdate(user.id, req.body, {
      new: true,
    });

    res.status(200).json({ data: updatedUser, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  updateUser,
  login,
  GetUserInfoByToken,
};
