const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel.js");
const actiontDb = require("../data/helpers/actionModel.js");

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb
    .get(id)
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.post("/:id/actions", validateProjectId, (req, res) => {
  const newPost = req.body;
  newPost.project_id = req.params.id;

  actiontDb
    .insert(newPost)
    .then(addedPost => res.status(201).json({ success: true, addedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.put("/:id", validateProjectId, (req, res) => {
  const updatedPostInfo = req.body;
  const { id } = req.params;

  projectDb
    .update(id, updatedPostInfo)
    .then(updatedPost => res.status(202).json({ success: true, updatedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb
    .remove(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).json({ success: false, err }));
});

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (id == undefined || id == "" || id.length == 0) {
    res
      .status(400)
      .json({ success: false, message: "No id passed into params" });
  }

  projectDb
    .get(id)
    .then(user => {
      console.log(user);
      if (user == undefined || user == "" || user.length == 0) {
        res
          .status(400)
          .json({ success: false, message: "No project found with that Id" });
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
}

module.exports = router;
