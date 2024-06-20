const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ errors: 'Token is required' });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: tokenData.id,
        };
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ errors: 'Invalid Token' })
    }
};

module.exports = { authenticateUser };
