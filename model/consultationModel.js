const mongoose = require('mongoose');

const consultationsSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required:true
    },
    folderNumber: {
        type: String,
        required:true
    },
    patientComplaint: {
        type: String,
        required:true
    },
    doctorAssessment: {
        type: String,
        required:true
    },
    diagnosis: {
        type: String,
        required:true
    },
    drugsPrescribed: {
        type: String,
        required:true
    },
    doctorName: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consultaions', consultationsSchema);