const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {DBConnection} = require("./database/db");
// const User = require("./models/User");
const userRoute = require("./routes/userRoute");
DBConnection();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
        res.send("Welcome to /");
    });

app.use("/",userRoute);

app.listen(process.env.PORT, ()=>{
        console.log(`Serever is running on port ${process.env.PORT}!`);
    });

module.exports = app;