const jwt = require('jsonwebtoken');
const SECRET_KEY = 'qwerty123';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err || !user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

module.exports = { authenticate };
