const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true }, // The question text
  options: [{type : String, required: true}], // An array of options
  correctAnswer: { type: String, required: true }, // The correct answer text
});

const comprehensiveQuizSchema = new mongoose.Schema({
  paragraph: { type: String, required: true }, // The paragraph for the quiz
  questions: [questionSchema], // An array of questions
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model("ComprehensiveQuiz", comprehensiveQuizSchema);

