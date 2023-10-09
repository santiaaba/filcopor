const db = require('../db');

// Crea un reporte
exports.newReport = (req, res) => {
  const { fqdn } = req.body;

	console.log("NEW report body:",req.body)

	let ip = null
    let i = 0
    while (!ip && i < req.rawHeaders.length) {
        console.log("Revisando", req.rawHeaders[i])
        if (req.rawHeaders[i] == 'X-Real-IP')
            ip = req.rawHeaders[i + 1]
        i++
    }

	if(!ip){
		return res.status(500).json({ error: 'Report creation failed' });
	}

	// Obtendo el user id mediante la ip de donde viene el reporte
	db.query('select id from users where ip_address = ?',ip,(err,result)=>{

		if (err){
			console.log("LA IP ERROR:",err)
			return res.status(500).json({ error: 'Report creation failed' });
		}
		console.log("LA IP:",result)

		let user_id = result[0].id
		// Inserta el reporte en la db
		const report = { user_id, fqdn };
		console.log("Report: ", report);

		db.query('INSERT INTO reports SET ?', report, (err, result) => {
			if (err) {
				console.log("LA IP ERROR:",err)
				return res.status(500).json({ error: 'Report creation failed' });
			}
			return res.status(201).json({ message: 'Report created successfully' });
		})
	})
}

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
