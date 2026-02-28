import express from "express";
import blogs from "./blogs.js";
import login from "./login.js";

const router = express.Router();

router.use("/blogs", blogs);
router.use("/login", login);

export default router;
