const db = require('../db');

// Get user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  db.query('SELECT * FROM users WHERE id = ?', userId, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user' });
    }

    if (rows.length !== 1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // Elimino informacion extra innecesaria
    const userResponse = {
      id: user.id,
      username: user.username,
      estado: user.estado,
      role: user.role,
      ip_adress: user.ip_adress
    };

    return res.status(200).json(userResponse);
  });
};

// Get a user by username
exports.getUserByUsername = (req, res) => {
  const { username } = req.params;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user by username' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // Elimino informacion extra innecesaria
    const userResponse = {
      id: user.id,
      username: user.username,
      estado: user.estado,
      role: user.role,
      ip_adress: user.ip_adress
    };

    return res.status(200).json(userResponse);
  });
};


