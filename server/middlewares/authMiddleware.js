const jwt = require('jsonwebtoken');
const {decode} = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token",token)
    if (!token) {
        return res.status(401).json({message: 'Access token missing'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({message: 'Access token expired', code: 'TOKEN_EXPIRED'},)
            }
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = decoded;
        req.user.token = token

        next()
    })
}

module.exports = verifyToken