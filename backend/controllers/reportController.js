const db = require('../db');

// Crea un reporte
exports.newReport = (req, res) => {
  const { username, fqdn, comentario, valoracion } = req.body;

  // Inserta el reporte en la db
  const report = { username, fqdn, comentario, valoracion };
  console.log("Report: ", report);

  db.query('INSERT INTO reports SET ?', report, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Report creation failed' });
    }

    return res.status(201).json({ message: 'Report created successfully' });
  });
};

// Get all reports
exports.getAllReports = (req, res) => {
  const user = req.user;

  if (user && user.role === 'admin') {
    db.query('SELECT * FROM reports', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching reports' });
      }

      return res.status(200).json(rows);
    });
  } else {
    return res.status(403).json({ error: 'Access denied' });
  }
};
