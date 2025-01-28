import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in user registration:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find the user by email
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the hashed password with the provided password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({
    message: "Login successful",
    success: true,
    token,
  });
};

export const userExists = async (req, res) => {
  try {
    let { userId } = req.body;

    let user = await User.findOne({
      email: userId.trim().toLowerCase(),
    });
    if (!user) {
      return res
        .status(201)
        .json({ message: "User not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "User exists", success: true, user: user });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePassword = async (req, res) => {
  // Update password logic here
  let { userId, password } = req.body;
  let user = await User.findOne({ username: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  return res
    .status(200)
    .json({ message: "Password updated successfully", success: true });
};
