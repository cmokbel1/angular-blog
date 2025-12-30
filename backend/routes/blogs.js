const router = require("express").Router();

// get one
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({ error: "invalid ID" });
    return;
  }
  // const data = Call to mongo db to get blog by id
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  res.json(player);
});

// get all
router.get("/", async (req, res) => {
  // const data = Call to mongo db to get all blogs
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  res.json(data);
});
