const { generateFile } = require("../compiler/generateFile");

const runFile = async (req,res)=>{
    const {language = 'cpp', code,input} = req.body;
    if(code === undefined || input === undefined){
        res.status(401).json({success:false, error: "Code or input is empty"});
    }
    // try{
    //     const filePath = await generateFile(language,code);
    //     res.json(filePath);
    // }
    // catch(err){
    //     console.log("Error running file", err);
    //     res.status(401).json({success: false, error: err.message})
    // }

    const result = await generateFile(language, code, input);

    if (result.success) {
        res.status(200).json({ output: result.output });
    } else {
        res.status(400).json({ error: result.error });
    }
}

module.exports = {runFile};