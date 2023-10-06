const jwt = require('jsonwebtoken');
// Secret key for JWT
const secretKey = 'P0)aHX?SHfqLfkmKU=iwH.JRbfFF#!j5'; // No deberia estar hardcoded

// Middleware para validar el JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("JWToken: ", token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token verification failed' });
        }

        // Añade el token decodificado al request
        req.user = decoded;
        next();
    });
};
