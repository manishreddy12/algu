const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problems",
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['cpp', 'py', 'js'],
        required: true
    },
    verdict: {
        type: String,
        // enum: ['Accepted', 'Wrong Answer', 'TLE', 'Memory Limit Exceeded','Other'],
        default: 'Pending' // default before evaluation
    },
    executionTime: {
        type: Number // in milliseconds(ms)
    }
}, {
    timestamps: true // adds createdAt (used as submittedAt) and updatedAt
});

module.exports = mongoose.model("Solution", solutionSchema);
