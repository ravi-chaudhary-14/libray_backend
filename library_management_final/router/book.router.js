const express = require('express');
const { createBook, deleteBook } = require('../controller/book.controller');
const { adminVarification } = require('../middleware/middleware');
const bookRouter = express.Router();

bookRouter.post('/addbook',adminVarification, createBook);
bookRouter.delete('/deletebook',adminVarification, deleteBook);

module.exports = {
    bookRouter,
}