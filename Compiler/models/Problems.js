const mongoose = require('mongoose')
// const testcaseSchema = require('./Testcases');
const exampleSchema = new mongoose.Schema({
    input:{
        type: String,
        required: true,
    },
    expectedOutput:{
        type: String,
        required: true,
    },
})

const problemSchema = new mongoose.Schema({
    pname: {
        type: String,
        default: null,
        required: true,

    },
    pcode: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    pstatement: {
        type:String,
        default: null,
        required: true,
    },
    pdifficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'], 
    required: true
    },
    examples: [exampleSchema],
},{
    timestamps: true
})

module.exports = mongoose.model("problem", problemSchema);