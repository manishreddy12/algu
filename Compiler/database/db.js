// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DBConnection = async()=>{
    const MONGO_URL = process.env.MONGO_URL;
    try{
        await mongoose.connect(MONGO_URL, {
  ssl: true,
  tlsAllowInvalidCertificates: true // Only for development!
});
        console.log("DB connection Establsihed");
    }
    catch(error){
        console.log("Error connecting DB", error);
    }
}

module.exports = {DBConnection};