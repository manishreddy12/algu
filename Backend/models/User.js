const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        required: true,
    },
    lastname: {
        type: String,
        default: null,
        required: true,
    },
    username: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    authorisation: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user',
    },
    email: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    status: [
        {
            pCode: { type: String, required: true },
            submissionTime: { type: String, default: null },
            result: { type: String, default: null }
        }
    ],
    accuracy: {
        total: { type: Number, default: 0 },
        correct: { type: Number, default: 0 }
    },
    // submissions: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Solution', // If your model name is "Solution"
    //         default: null
    //     }
    // ],
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", userSchema);