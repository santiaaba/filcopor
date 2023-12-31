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
      email: user.email,
      nomape: user.nomape,
      telefono: user.telefono,
      id_ciudad: user.id_ciudad,
      estado: user.estado,
      role: user.role,
      ip_adress: user.ip_adress
    };

    return res.status(200).json(userResponse);
  });
};

// Get a user by email
exports.getUserByEmail = (req, res) => {
  const { email } = req.params;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user by email' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // Elimino informacion extra innecesaria
    const userResponse = {
      id: user.id,
      email: user.email,
      nomape: user.nomape,
      telefono: user.telefono,
      id_ciudad: user.id_ciudad,
      estado: user.estado,
      role: user.role,
      ip_adress: user.ip_adress
    };

    return res.status(200).json(userResponse);
  });
};

// Check if an email exists
exports.checkEmail = (req, res) => {
  const email = req.params.email;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking email' });
    }

    if (rows.length > 0) {
      // Email existe en db
      return res.status(200).json({ exists: true });
    } else {
      // Email no existe en db
      return res.status(200).json({ exists: false });
    }
  });
};
