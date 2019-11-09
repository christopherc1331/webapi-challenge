const express = require("express");
const router = express.Router();
const actionDb = require("../data/helpers/actionModel.js");

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.post("/:id/actions", (req, res) => {
  const newAction = req.body;
  const { id } = req.params;

  newAction.project_id = id;

  actionDb
    .insert(newPost)
    .then(addedPost => res.status(201).json({ success: true, addedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.put("/:id", (req, res) => {
  const updatedActionInfo = req.body;
  const { id } = req.params;

  actionDb
    .update(id, updatedPostInfo)
    .then(updatedPost => res.status(202).json({ success: true, updatedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  actionDb
    .remove(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).json({ success: false, err }));
});

module.exports = router;
