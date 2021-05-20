const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    passwd: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;