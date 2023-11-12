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

// Middleware para validar el JWT token de un administrador
exports.verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token verification failed' });
        }

        // Verifica si el usuario tiene el rol de 'admin'
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized. Admin role required.' });
        }

        // Añade el token decodificado al request
        req.user = decoded;
        next();
    });
};