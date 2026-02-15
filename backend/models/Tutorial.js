const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  video_url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  materials: [{ name: String, quantity: String }],
  steps: [{ step_number: Number, title: String, description: String }],
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
