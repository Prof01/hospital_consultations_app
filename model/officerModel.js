const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Officer', officerSchema);