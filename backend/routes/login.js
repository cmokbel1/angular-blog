import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Login route
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check password (for simplicity, using plain text - in production, use hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
