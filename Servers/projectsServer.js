const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel.js");

router.get("/");

module.exports = router;
