const db = require('../db');

// Get all states
exports.getAllStates = (req, res) => {
    db.query('SELECT * FROM states', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching states' });
        }

        return res.status(200).json(rows);
    });
};

// Get all cities
exports.getAllCities = (req, res) => {
    db.query('SELECT * FROM cities', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching cities' });
        }

        return res.status(200).json(rows);
    });
};

// Get state by ID
exports.getStateById = (req, res) => {
    const stateId = req.params.id;

    db.query('SELECT * FROM states WHERE id = ?', [stateId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching state by ID' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'State not found' });
        }

        return res.status(200).json(rows[0]);
    });
};

// Get city by ID
exports.getCityById = (req, res) => {
    const cityId = req.params.id;

    db.query('SELECT * FROM cities WHERE id = ?', [cityId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching city by ID' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'City not found' });
        }

        return res.status(200).json(rows[0]);
    });
};

// Get cities by stateID
exports.getCitiesByStateId = (req, res) => {
    const stateId = req.params.stateId;

    //
    db.query('SELECT * FROM states WHERE id = ?', [stateId], (stateErr, stateRows) => {
        if (stateErr) {
            return res.status(500).json({ error: 'Error fetching state by ID' });
        }

        if (stateRows.length === 0) {
            return res.status(404).json({ error: 'State not found' });
        }

        // Busca ciudades por estadoID
        db.query('SELECT * FROM cities WHERE id_state = ?', [stateId], (err, cityRows) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching cities by state' });
            }

            return res.status(200).json(cityRows);
        });
    });
};