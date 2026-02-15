const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Thumbnail untuk card di Home
  description: { type: String },
});

module.exports = mongoose.model('Category', categorySchema);
