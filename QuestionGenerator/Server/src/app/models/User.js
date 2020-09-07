const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    isAdmin: Boolean,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);