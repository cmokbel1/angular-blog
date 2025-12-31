import express from "express";
import blogs from "./blogs.js";

const router = express.Router();

router.use("/blogs", blogs);

export default router;
