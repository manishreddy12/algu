const fs = require('fs');
const {generateInputFIle} = require('./generateInputFile');
const path = require('path');
const { v4 : uuid } = require('uuid');
const{executecpp} = require('./execteCpp');
const{executePy} = require('./executePy');
const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive: true});
}

const generateFile = async (language,code,input)=>{
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    console.log(fileName);
    const filePath = path.join(dirCodes,fileName);
    const inputFilePath = await generateInputFIle(input)
    fs.writeFileSync(filePath,code);
    // return filePath;
    if(language === 'cpp'){
        try {
            const output = await executecpp(filePath, inputFilePath);
            console.log("Output is:", output);
            // res.status(200).send({output});
            return {success:true, output};
        } catch (err) {
            console.error("Execution error:", err);
            // res.status(400).send({ error: err.stderr || err.error });
            return {
                success: false,
                error: err.stderr || err.error || "Unknown error during execution"
            };
        }
    }
    else if(language === 'py'){
         try {
            const output = await executePy(filePath, inputFilePath);
            console.log("Output is:", output);
            // res.status(200).send({output});
            return {success:true, output};
        } catch (err) {
            console.error("Execution error:", err);
            // res.status(400).send({ error: err.stderr || err.error });
            return {
                success: false,
                error: err.stderr || err.error || "Unknown error during execution"
            };
        }
    }
}

module.exports= {generateFile};