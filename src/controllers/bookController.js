import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
try {
const books = await Book.find({ userId: req.user.id }).sort({ createdAt: -1 });
res.json(books);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};



export const createBook = async (req, res) => {
try {
const { title, author, tags = [], status } = req.body;
if (!title || !author) return res.status(400).json({ message: 'Title and author required' });


const book = await Book.create({
title,
author,
tags,
status: status || 'Want to Read',
userId: req.user.id
});
res.status(201).json(book);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const updateBook = async (req, res) => {
try {
const { id } = req.params;
const book = await Book.findOne({ _id: id, userId: req.user.id });
if (!book) return res.status(404).json({ message: 'Book not found' });


const updates = req.body;
Object.assign(book, updates);
await book.save();
res.json(book);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const deleteBook = async (req, res) => {
try {
const { id } = req.params;
const book = await Book.findOneAndDelete({ _id: id, userId: req.user.id });
if (!book) return res.status(404).json({ message: 'Book not found' });
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};