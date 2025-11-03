const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  cover: String // ✅ Add this line
});

module.exports = mongoose.model('Book', bookSchema);


