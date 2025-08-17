const fs = require('fs');
const { generateInputFIle } = require('./generateInputFile');
const path = require('path');
const { v4: uuid } = require('uuid');
const { executecpp } = require('./execteCpp');
const { executePy } = require('./executePy');
const Problems = require('../models/Problems');
const Testcases = require('../models/Testcases');
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateSubmit = async (language, code, pcode) => {
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    console.log(fileName);
    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code);
    const problem = await Problems.findOne({ pcode });
    const pId = problem._id;
    const testcase = await Testcases.find({ problemId: pId });
    
    if (!Array.isArray(testcase) || testcase.length === 0) {
        return { success: false,problemId:pId,output: "No testcases found for this problem" };
    }
    try {
        for (let i = 0; i < testcase.length; i++) {
            let input = testcase[i].input;
            const inputFilePath = await generateInputFIle(input)
            let output = '';
            if (language === 'cpp') output = await executecpp(filePath, inputFilePath);
            else if (language === 'py') output = await executePy(filePath, inputFilePath);
            console.log("Output is:", output);
            console.log("expected Output is:", testcase[i].expectedOutput);
            if (!(output === testcase[i].expectedOutput)) {
                console.log("Incorrect ouput");
                return {
                    success: false, problemId:pId,output: `testcase ${i} failed`
                };
            }
        }
        return { success: true,problemId:pId, output: "All test cases passed" };
    } catch (err) {
        console.error("Execution error:", err);
        return {
            success: false,
            problemId:pId,
            output: err.stderr || err.error || "Unknown error during execution"
        };
    }
}

module.exports = { generateSubmit };