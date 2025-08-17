const {generateSubmit} = require('./generateSubmit');
const Solution = require('../models/Solutions');

const submitProblem = async (req,res)=>{
    const {language = 'cpp', code, pcode} = req.body;
    if(code === undefined){
        res.json({success:false, error: "Code is empty"});
    }

    const solution = new Solution({
        code,
        language
    });
    const result = await generateSubmit(language, code, pcode);
    solution.problemId = result.problemId;
    solution.verdict = result.output;
    await solution.save();
    if (result.success) {
        res.json({ success: result.success,output: result.output });
    } else {
        res.json({ success: result.success,output: result.output });
    }
}

module.exports = {submitProblem};