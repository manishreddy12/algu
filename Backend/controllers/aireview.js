const {generateReview} = require("./generaterev")

const ai_review = async (req,res) =>{
    var {code} = req.body;
    if(code === undefined || code.trim()===''){
        console.log("Please provode some code");
        res.json("Please provode some code");
    }
    else{
        try{
            code = JSON.stringify({code});
            const review = await generateReview(code);
            res.json(review);
        }
        catch(err){
            console.log("Error generating ai review"+err);
            res.json("Error generating ai review");
        }
    }
}

module.exports = {ai_review,};