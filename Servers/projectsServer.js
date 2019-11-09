const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel.js");

router.get("/", (req, res) => {
  projectDb
    .get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.post("/", (req, res) => {
  const newPost = req.body;

  projectDb
    .insert(newPost)
    .then(addedPost => res.status(201).json({ success: true, addedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.put("/:id", (req, res) => {
  const updatedPostInfo = req.body;
  const { id } = req.params;

  projectDb
    .update(id, updatedPostInfo)
    .then(updatedPost => res.status(202).json({ success: true, updatedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  projectDb
    .remove(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).json({ success: false, err }));
});

module.exports = router;
