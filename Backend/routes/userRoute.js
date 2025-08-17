const express = require('express');
const User = require("../models/User");
const Problems = require("../models/Problems");
const {handleUserLogin,createNewUser} = require("../controllers/c1");
const {createProblem,readProblem,allProblems,addManyTestcases, deleteProblem, deleteAllSolutions} = require("../controllers/c2");
const verifyToken = require("../middlewares/authMiddlewares")
const authoriseRoles = require("../middlewares/authRoles");
const {ai_review} = require("../controllers/aireview");
const { runFile } = require("../controllers/runFile");
const {submitProblem} = require('../compiler/submitProblem');
//Routes
const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", createNewUser);

// router.get("/:pcode", readProblem);
router.post("/createProblem", verifyToken, authoriseRoles("manager","admin"), createProblem);
// router.post("/createProblem", createProblem);
router.post("/addtestcases", addManyTestcases);
router.post("/deleteproblem", deleteProblem);
router.post("/deleteSolutions",deleteAllSolutions)
router.get("/readProblem/:pcode",verifyToken, authoriseRoles("user","manager","admin"), readProblem);
// router.get("/readProblem/:pcode", readProblem);
router.get("/problems", allProblems);
router.post("/run", runFile);
router.post("/submit", submitProblem);
router.post("/ai-review", ai_review);

// router.get("/readProblem/:pcode", readProblem);

module.exports = router;