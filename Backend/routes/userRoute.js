const express = require('express');

const {handleUserLogin,createNewUser,changeRole} = require("../controllers/c1");
const {createProblem,readProblem,allProblems,addManyTestcases, deleteProblem, deleteAllSolutions} = require("../controllers/c2");
const verifyToken = require("../middlewares/authMiddlewares")
const authoriseRoles = require("../middlewares/authRoles");

//Routes
const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", createNewUser);
router.post("/createProblem", verifyToken, authoriseRoles("manager","admin"), createProblem);
router.post("/addtestcases", verifyToken, authoriseRoles("manager","admin"),addManyTestcases);
router.post("/deleteproblem", verifyToken, authoriseRoles("manager","admin"), deleteProblem);
router.post("/deleteSolutions",verifyToken, authoriseRoles("manager","admin"),deleteAllSolutions)
router.post("/changeroles",verifyToken, authoriseRoles("manager","admin"),changeRole),
router.get("/readProblem/:pcode",verifyToken, authoriseRoles("user","manager","admin"), readProblem);
router.get("/problems", allProblems);

module.exports = router;