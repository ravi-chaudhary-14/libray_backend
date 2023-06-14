const { adminCreateBook, adminDeleteBook } = require("../service/book.service")

const createBook = async (req, res) => {
    try {
        res.send(await adminCreateBook(req.body));
    } catch (err) {
        res.send(err);
    }
}

const deleteBook = async (req, res) => {
    try {
        res.send(await adminDeleteBook(req.body));
    } catch (err) {
        res.send(err);
    }
}
module.exports = {
    createBook,
    deleteBook,
}