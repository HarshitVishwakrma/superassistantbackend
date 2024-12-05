const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const CategoryQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  categories: {
    type: [String], // Array of category names
    required: true,
  },
  options: {
    type: [OptionSchema], // Array of options
    validate: {
      validator: function (v) {
        // Ensure options belong to the given categories
        return v.every((opt) => this.categories.includes(opt.category));
      },
      message: 'Each option must belong to one of the provided categories.',
    },
    required: true,
  },
});

module.exports = mongoose.model('CategoryQuestion', CategoryQuestionSchema);
