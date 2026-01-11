import express from "express";
import Blog from "../models/Blog.js";
import { getFromCache, setCache, clearCache } from "../utils/cache.js";

const router = express.Router();

// get one
router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    // Check if ID is valid ObjectId format
    if (!blogId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid blog ID format" });
    }

    // Check cache first
    const cacheKey = `blog_${blogId}`;
    let blog = getFromCache(cacheKey);

    if (!blog) {
      // Fetch from database if not in cache
      blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Cache the result for 10 minutes
      setCache(cacheKey, blog, 600000);
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all
router.get("/", async (req, res) => {
  try {
    const cacheKey = "all_blogs";
    let blogs = getFromCache(cacheKey);

    if (!blogs) {
      // Fetch from database if not in cache
      console.log("Fetching blogs from database");
      console.log(Blog);
      blogs = await Blog.find();

      // Cache the result for 5 minutes
      setCache(cacheKey, blogs, 300000);
    }

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Clear cache endpoint (for development/admin use)
router.delete("/cache", (req, res) => {
  clearCache();
  res.json({ message: "Cache cleared" });
});

export default router;
