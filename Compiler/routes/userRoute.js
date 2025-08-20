const express = require('express');
const User = require("../models/User");
const Problems = require("../models/Problems");

const {ai_review} = require("../controllers/aireview");
const { runFile } = require("../runFile");
const {submitProblem} = require('../submitProblem');

//Routes
const router = express.Router();
router.post("/run", runFile);
router.post("/submit", submitProblem);
router.post("/ai-review", ai_review);

module.exports = router;