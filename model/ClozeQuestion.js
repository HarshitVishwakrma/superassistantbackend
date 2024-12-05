const mongoose = require('mongoose');

const clozeQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    correctAnswers: {
        type: [String], // Array of correct answer strings
        required: true,
    },
    additionalOptions: {
        type: [String], // Array of additional options
        default: [], // Default to an empty array if not provided
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

module.exports = mongoose.model('ClozeQuestion', clozeQuestionSchema);
