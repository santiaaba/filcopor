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
    };

    return res.status(200).json(userResponse);
  });
};


