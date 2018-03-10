var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
    name: String,
    limit: Number,
    apr: Number,
    interest: Number,
    balance: Number,
    daysOpen: Number
});

var Card = mongoose.model('Card', cardSchema);

module.exports = {
    Card: Card,
};
