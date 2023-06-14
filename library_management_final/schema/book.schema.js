const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    available: {
        type: Number,
        required: true,
    },
    issued: {
        type: Number,
        required: true,
        default: 0,
    },
    submitId: {
        type: Schema.Types.ObjectId,
        default: null,
    }
    
});

const bookModel = model('Book',bookSchema);

module.exports = {
    bookModel,
}