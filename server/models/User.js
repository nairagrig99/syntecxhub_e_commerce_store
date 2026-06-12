const mongoose = require('mongoose');
const field_required = "Please don't leave field empty";

const UserScheme = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, field_required],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, field_required],
        trim: true
    },
    email: {
        type: String,
        required: [true, field_required],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, field_required],
        minLength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        required:true,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', UserScheme);