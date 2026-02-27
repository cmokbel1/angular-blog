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

    User.authenticate()(username, password, (err, user) => {
      if (err) {
        return res
          .status(err.status)
          .json({ error: "Something unexpected occured", err });
      }

      if (!user) {
        return res
          .status(400)
          .json({ error: "Bad Request: Invalid username or password" });
      }

      // Successful login
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  const existing = await User.findOne({ username });
  if (existing)
    return res.status(409).json({ error: "Username already exists" });

  const user = await User.register(new User({ username }), password); // pre-save hook hashes it
  return res.status(201).json({ id: user._id, username: user.username });
});

export default router;
