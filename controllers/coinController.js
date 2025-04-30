const Coin = require('../models/Coin');

const getCoins = async (req, res) => {
    const coins = await Coin.find();
    res.json(coins);
};

const getCoinById = async (req, res) => {
    const coin = await Coin.findById(req.params.id);
    if (coin) res.json(coin);
    else res.status(404).json({ error: 'Coin not found' });
};

const addCoin = async (req, res) => {
    try {
        const newCoin = new Coin(req.body);
        await newCoin.save();
        res.status(201).json({ message: 'Coin added' });
    } catch {
        res.status(400).json({ error: 'Invalid data' });
    }
};

const deleteCoin = async (req, res) => {
    await Coin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coin deleted' });
};

module.exports = { getCoins, getCoinById, addCoin, deleteCoin };
