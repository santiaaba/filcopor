const jwt = require('jsonwebtoken');
const db = require('../db');

// Secret key for JWT
const secretKey = 'P0)aHX?SHfqLfkmKU=iwH.JRbfFF#!j5'; // No deberia estar hardcoded

// Registra un nuevo usuario
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Verifica los campos no esten vacios
  if (!username || !password || username.trim() === '' || password.trim() === '') {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Verifica que el usuario no exista en la base de datos
  db.query('SELECT * FROM users WHERE username = ?', username, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Registration failed' });
    }

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
    // Añadir datos faltantes del registro
    const user = { username, password };

    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Registration failed' });
      }

      return res.status(201).json({ message: 'Registration successful' });
    });
  });
};

// Logea a un usuario
exports.login = (req, res) => {
  const { username, password } = req.body;
  const userIpAddress = req.ip;
  console.log("IP: ", userIpAddress);
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, rows) => {
    if (err) {
	console.log("login: error",err)
      return res.status(500).json({ error: 'Login failed' });
    }

    if (rows.length !== 1) {
	console.log("login: rows.length",rows.length)
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const user = rows[0];

    // Actualiza la ip_address del usuario en la base de datos
    const updateUserIPQuery = 'UPDATE users SET ip_address = ? WHERE username = ?';
    db.query(updateUserIPQuery, [userIpAddress, username], (updateError, updateResult) => {
      if (updateError) {
        return res.status(500).json({ error: 'Error updating IP address' });
      }
    });

    // Genera un JWT token
    const token = jwt.sign({ username: user.username, role: user.role, userIpAddress }, secretKey, { expiresIn: '12h' });
    return res.status(200).json({ message: 'Login successful', token });
  });
};

// Deslogea e invalida el token
// habria que añadirlo a una blacklist tambien
exports.logout = (req, res) => {
  // TO DO
  return res.status(200).json({ message: 'Logout successful' });
};
