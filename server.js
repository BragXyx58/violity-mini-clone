const http = require('http');
const mongoose = require('mongoose');
const url = require('url');

mongoose.connect('mongodb+srv://admin:admin@bd1.wxwphls.mongodb.net/?retryWrites=true&w=majority&appName=bd1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

const coinSchema = new mongoose.Schema({
    name: String,
    year: Number,
    country: String,
    material: String,
    price: Number,
    quantity: Number
});

const Coin = mongoose.model('Coin', coinSchema);

const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'GET' && reqUrl.pathname === '/coins') {
        const coins = await Coin.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(coins));
    } 
    else if (req.method === 'POST' && reqUrl.pathname === '/coins') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const { name, year, country, material, price, quantity } = JSON.parse(body);
                const newCoin = new Coin({ name, year, country, material, price, quantity });
                await newCoin.save();
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Coin added" }));
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid data" }));
            }
        });
    } 
    else if (req.method === 'DELETE' && reqUrl.pathname.startsWith('/coins?id=')) {
        const id = reqUrl.query.id;
        await Coin.findByIdAndDelete(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Coin deleted" }));
    } 
    else if (req.method === 'GET' && reqUrl.pathname.startsWith('/coins/find?id=')) {
        const id = reqUrl.query.id;
        const coin = await Coin.findById(id);
        if (coin) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(coin));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Coin not found" }));
        }
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
