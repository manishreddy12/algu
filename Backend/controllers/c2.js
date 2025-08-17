const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Problems = require("../models/Problems");
const Testcases = require('../models/Testcases');
const Solutions = require('../models/Solutions');

const createProblem = async (req, res) => {
    const { pname, pcode, pstatement, pdifficulty, examples } = req.body;
    if (!(pname && pcode && pstatement && pdifficulty)) {
        return res.status(404).send("All fields are required")
    }

    if (!Array.isArray(examples) || examples.length === 0) {
        return res.status(404).send("Test cases are empty or invalid");
    }

    for (let i = 0; i < examples.length; i++) {
        let tc = examples[i];
        if (!tc.input || !tc.expectedOutput) {
            return res.status(404).send(`examples ${i} is invalid`);
        }
    }

    const existingPcode = await Problems.findOne({ pcode });
    if (existingPcode) {
        res.status(404).send("Existing Problem code");
    }
    const problem = await Problems.create({
        pname,
        pcode,
        pstatement,
        pdifficulty,
        examples
    })

    const token = jwt.sign(
        { id: problem._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.status(201).json({
        message: "problem registered successfully",
        problem: {
            id: problem._id,
            pcode: problem.pcode,
            statement: problem.pstatement
        },
        token
    });

}

const readProblem = async (req, res) => {
    const { pcode } = req.params;
    const problem = await Problems.findOne({ pcode });
    console.log("readProblem request recieved")
    if (!problem) {
        res.status(404).send()
    }
    const token = jwt.sign(
        { id: problem._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
    
    res.status(201).json({
        message: "problem returned successfully",
        problem: {
            id: problem._id,
            pcode: problem.pcode,
            pname: problem.pname,
            pdifficulty: problem.pdifficulty,
            statement: problem.pstatement,
            examples: problem.examples
        },
        token
    });

}


const deleteProblem = async(req,res)=> {
    const {pcode} = req.body;
    try{
        const problem = await Problems.findOne({pcode});
        const test_res = await Testcases.deleteMany({problem:problem._id});
        const ans = await Problems.deleteOne({pcode});
        if(ans && test_res){
            res.json("Deleted successfully");
        }
        else if(ans || test_res){
            res.json("Partially deleted");
        }
        else{
            res.json("Deletion failed");
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

const deleteAllSolutions = async(req,res)=>{
    try{
        const result = await Solutions.deleteMany({});
        if(res){
            res.json("All solutions deleted successfully")
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

const allProblems = async (req, res) => {
    try {
        const problems = await Problems.find({}, 'pname pdifficulty pcode');
        res.status(200).json(problems);
    }
    catch (err) {
        console.log("Error fetching problems" + err);
        res.status(401).json({ message: "Error fetching problems" })
    }
}

const addManyTestcases = async (req,res)=>{
    try{
        const {pcode,allTestcases} = req.body;
        if(!pcode || !allTestcases){
            res.send(`All fields required`);
        }
        const problem = await Problems.findOne({pcode});
        const pId = problem._id;
        for(let t=0;t<allTestcases.length;t++){
            const {input,expectedOutput} = allTestcases[t];
            if(!input || !expectedOutput){
                res.send(`All fields required for testcase ${t+1}`);
            }
            await Testcases.create({
                problemId: pId,
                input,
                expectedOutput
            });
        } 
        res.status(200).send("All testcases added successfully");
    }
    catch(err){
        console.log("Error occurred"+ err);
        res.send(`Error occurred ${err}`);
    }
}

module.exports = { createProblem, readProblem, allProblems, addManyTestcases, deleteProblem, deleteAllSolutions};