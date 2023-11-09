const db = require('../db');

// Crea un fqdn
exports.newFqdn = (req, res) => {
    const { name, isPorn, ponderation, domain } = req.body;

    // inserto nuevo fqdn en la db
    db.query(
        'INSERT INTO fqdn (name, isPorn, ponderation, domain) VALUES (?, ?, ?, ?)',
        [name, isPorn, ponderation, domain],
        (err, result) => {
            if (err) {
                console.error('Error creating new FQDN:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            return res.status(201).json({ id: result.insertId, message: 'FQDN created successfully' });
        }
    );
};

// Get fqdn by ID
exports.getFqdnById = (req, res) => {
    const fqdnId = req.params.id;

    db.query('SELECT * FROM fqdn WHERE id = ?', [fqdnId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching FQDN by ID' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'FQDN not found' });
        }

        return res.status(200).json(rows[0]);
    });
};

// Modifica un fqdn by ID
exports.updateFqdn = (req, res) => {
    const fqdnId = req.params.id;
    const { ponderation, isPorn } = req.body;

    // Actualizo los datos en la db
    db.query('UPDATE fqdn SET ponderation = ?, isPorn = ? WHERE id = ?', [ponderation, isPorn, fqdnId], (err, result) => {
        if (err) {
            console.error('Error updating FQDN:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'FQDN not found' });
        }

        return res.status(200).json({ message: 'FQDN updated successfully' });
    }
    );
};


