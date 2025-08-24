const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const { verifyToken } = require('../middlewares/authMiddlewares');
// const Problems = require("../models/Problems");

// app.post("/login", async (req, res) => {
const handleUserLogin = async (req,res)=>{
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            // return res.status(400).send("All fields are required");
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(" is Match is "+ isMatch);
        if (!isMatch) {
            // return res.status(401).send("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.authorisation }, //  use 'role' here
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
            );
        const role_send = user.authorisation;
        console.log(role_send);
        res.status(200).json({ token:token,role:role_send });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

const changeRole = async (req, res) => {
  try {
    const { username, newrole } = req.body;

    if (!username || !newrole) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.authorisation = newrole;

    await user.save(); // Save the updated user document

    return res.status(200).json({ message: "User role updated successfully" });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// app.post("/signup", async (req, res) => {
const createNewUser = async (req,res) => {
    try {
        console.log('Received signup request:', req.body); // Debug logging
        const {firstname, lastname, username,authorisation, email, password} = req.body;
        
        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        if (password.length < 8) {
            return res.status(400).send("Password must be at least 8 characters");
        }

        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(409).send("Email already exists");
        }

        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(409).send("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstname,
            lastname,
            username,
            authorisation,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                authorisation: user.authorisation
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};


const updateStatus = async (req, res) => {
    const { usertoken, pcode, subTime, subResult } = req.body;
    try {
        const decode = jwt.verify(usertoken, process.env.SECRET_KEY);
        // console.log("decoded is "+decode);
        const user_id = decode.id;
        // Find user by ID, returning a single document
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const new_status = {
            pCode: pcode,
            submissionTime: subTime, // convert to Date if needed
            result: subResult
        };
        const existing_accuracy = user.accuracy;
        let new_correct = existing_accuracy.correct;
        if(subResult === "true"){
            new_correct +=1;
        }
        const new_accuracy = {
            total:existing_accuracy.total+1,
            correct: new_correct
        };
        // Add the new status object to the array
        user.status.push(new_status);
        await user.save();
        res.send("Status updated successfully");
    } catch (err) {
        console.log("Error: " + err);
        return res.status(401).json({ message: "Token not valid" });
    }
};

const sendSubmissions = async(req,res) => {
    const { usertoken} = req.body;
    try {
        const decode = jwt.verify(usertoken, process.env.SECRET_KEY);
        // console.log("decoded is "+decode);
        const user_id = decode.id;
        // Find user by ID, returning a single document
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ans = user.status;
        res.json({data: ans});
    }
    catch(err){
        console.log("Error sending submissions : "+err);
        res.json({message: "Error sending submission data"});
    }
} 

module.exports = {
    handleUserLogin,
    createNewUser,changeRole,updateStatus,sendSubmissions,
};