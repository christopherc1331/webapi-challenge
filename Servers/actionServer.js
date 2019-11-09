const express = require("express");
const router = express.Router();
const actionDb = require("../data/helpers/actionModel.js");

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params;

  actionDb
    .get(id)
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.put("/:id", validateActionId, (req, res) => {
  const updatedActionInfo = req.body;
  const { id } = req.params;

  actionDb
    .update(id, updatedPostInfo)
    .then(updatedPost => res.status(202).json({ success: true, updatedPost }))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;

  actionDb
    .remove(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).json({ success: false, err }));
});

function validateActionId(req, res, next) {
  const { id } = req.params;

  if (id == undefined || id == "" || id.length == 0) {
    res
      .status(400)
      .json({ success: false, message: "No id passed into params" });
  }

  actionDb
    .get(id)
    .then(user => {
      console.log(user);
      if (user == undefined || user == "" || user.length == 0) {
        res
          .status(400)
          .json({ success: false, message: "No action found with that Id" });
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
}

module.exports = router;
