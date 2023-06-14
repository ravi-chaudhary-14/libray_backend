const { getOneData, create, deleteData } = require('../dao/dao');
const { bookModel } = require('../schema/book.schema');

const adminCreateBook = async (book) => {
    const { bookName } = book;
    if (!await getOneData(bookModel, { bookName })) {
        book.available = book.total;
        return await create(bookModel, book);
    }
    return 'book already in library';
}

const adminDeleteBook = async (book) => {
    const { bookName } = book;
    if (!await getOneData(bookModel, {bookName})) {
        return 'There is no data for delete';
    }
    return await deleteData(bookModel, book);
}

module.exports = {
    adminCreateBook,
    adminDeleteBook,
}