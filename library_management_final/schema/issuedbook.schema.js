const { model, Schema } = require('mongoose');

const issueBookSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    submit: {
        type: Boolean,
        required: true,
        default: false,
    },
    returnDate: {
        type: Date,
        required: true,
        default: +new Date() + 7 * 24 * 60 * 60 * 1000,
    },
    issuedDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const issuedBookModel = model('IssuedBook',issueBookSchema);

module.exports = {
    issuedBookModel,
}