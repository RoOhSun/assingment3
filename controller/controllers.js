/*
Group Assignment 3
Filename:controller.js
Student name: Yogesh Neupane (200570557) and Roshan Khatri (200575702)
Date: 2024/03/17
 */

const Book = require('../models/bookmodels');

/**
 * Get all the books.
 * @returns display all the books in table format
 */
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    
    //display the result into tabular format
    res.json(books)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a book details by its ID.
 * @param {string} req.params.id - Book ID
 * @returns Book detail with the specified ID
 */
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Add a new book.
 * @param {Object} req.body - The data of the new book
 * @returns The newly created book
 */
exports.addNewBook = async (req, res) => {
  const bookData = req.body;
  try {
    const newBook = await Book.create(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update an details of existing book.
 * @param {string} req.params.id - Book ID
 * @param {Object} req.body - updated book data
 * @returns The updated book
 */
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBookData = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete an existing book.
 * @param {string} req.params.id - book ID
 * @returns Success message after on deletion
 */
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};