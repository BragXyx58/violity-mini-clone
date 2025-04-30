const express = require('express');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const coinRoutes = require('./routes/coinRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(authRoutes);
app.use(coinRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
