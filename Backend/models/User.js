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
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", userSchema);