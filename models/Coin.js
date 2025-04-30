const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: String,
    year: Number,
    country: String,
    material: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('Coin', coinSchema);
