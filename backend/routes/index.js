const router = require("express").Router();
const blogs = require("./blogs");

router.use("/blogs", blogs);

module.exports = router;
