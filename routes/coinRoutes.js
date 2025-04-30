const express = require('express');
const {
    getCoins,
    getCoinById,
    addCoin,
    deleteCoin
} = require('../controllers/coinController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/coins', getCoins);
router.get('/coins/:id', getCoinById);
router.post('/coins', authenticate, addCoin);
router.delete('/coins/:id', authenticate, deleteCoin);

module.exports = router;
