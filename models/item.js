const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Объявляем схему с помощью которой мы будем обращаться к документам Items через ORM mongoose.
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('items', ItemSchema)