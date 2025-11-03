const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// 📘 Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ➕ Add new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: 'Book added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

