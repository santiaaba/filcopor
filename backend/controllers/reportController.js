const db = require('../db');

// Crea un reporte
exports.newReport = (req, res) => {
	const { fqdn } = req.body;

	console.log("NEW report body:", req.body)

	let ip = null
	let i = 0
	while (!ip && i < req.rawHeaders.length) {
		console.log("Revisando", req.rawHeaders[i])
		if (req.rawHeaders[i] == 'X-Real-IP')
			ip = req.rawHeaders[i + 1]
		i++
	}

	if (!ip) {
		return res.status(500).json({ error: 'Invalid IP' });
	}

	// Obtengo el user id mediante la ip de donde viene el reporte
	db.query('select id from users where ip_address = ?', ip, (err, result) => {

		if (err) {
			console.log("LA IP ERROR:", err)
			return res.status(500).json({ error: 'Report creation failed' });
		}
		console.log("LA IP:", result)

		let user_id = result[0].id
		// Inserta el reporte en la db
		const report = { user_id, fqdn };
		console.log("Report: ", report);

		db.query('INSERT INTO reports SET ?', report, (err, result) => {
			if (err) {
				return res.status(500).json({ error: 'Report creation failed' });
			}

			return res.status(201).json({ message: 'Report created successfully' });
		})
	})
}

// Get all reports
exports.getAllReports = (req, res) => {
	db.query('SELECT * FROM reports', (err, rows) => {
		if (err) {
			return res.status(500).json({ error: 'Error fetching reports' });
		}

		return res.status(200).json(rows);
	});
};

// Retorna si un sitio es pornografico
exports.isPorn = (req, res) => {
	const { fqdn } = req.body;

	db.query('SELECT * FROM fqdn WHERE name = ? AND isPorn = ?', [fqdn, 'yes'], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: 'Error fetching fqdn' });
		}
		if (rows.length > 0) {
			return res.status(200).json({ isPorn: true });
		} else {
			return res.status(200).json({ isPorn: false });
		}
	});
};

// Modificar estado del reporte
exports.updateReportState = (req, res) => {
	const reportId = req.params.id;
	const { status } = req.body;

	// Verifico valor del status
	if (!status || !['abierto', 'cerrado', 'revision'].includes(status)) {
		console.log('Invalid status provided');
		return res.status(400).json({ error: 'status debe ser "abierto", "cerrado", o "revision"' });
	}

	// Actualizo los datos en la db
	db.query('UPDATE reports SET status = ? WHERE id = ?', [status, reportId], (err, result) => {
		if (err) {
			console.error('Error updating status of report by ID:', err);
			return res.status(500).json({ error: 'Internal server error' });
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'Report not found' });
		}

		return res.status(200).json({ message: 'Report status updated successfully' });
	});

};