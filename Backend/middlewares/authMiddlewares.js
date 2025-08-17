const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');


// const verifyToken = (req,res,next)=>{
//     const authHeader = req.headers.authorization;
//     console.log("authHeader : "+authHeader);
//     if(!authHeader){
//         res.status(404).send("Error authenticating token");
//     }
//     let token;
//     token =authHeader.split(' ')[1];
//     try{
//         const decode = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decode;
//         console.log("decoded user is", req.user); 
//         next();
//     }
//     catch{
//         res.status(400).json({message: "Token not valid"});
//     }

// }

const verifyToken = (req, res, next) => {
    console.log(req.headers);
    
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);

    if (!authHeader) {
        // Stop execution after sending the response
        console.log("Error Authenticating token");
        
        return res.status(401).send("Error authenticating token");
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        // Handle malformed header
        console.log("Malformed auth header");
        return res.status(400).json({ message: "Malformed auth header" });
    }
    
    const token = parts[1];
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        console.log("decoded user is", req.user); 
        next();
    } catch (err) {
        // Optionally log error
        console.log("Token not valid"+err);
        return res.status(401).json({ message: "Token not valid" });
    }
};



module.exports = verifyToken;