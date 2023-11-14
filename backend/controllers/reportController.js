const db = require("../db");

// Crea un reporte
// Crea un reporte
exports.newReport = (req, res) => {
  const { fqdn } = req.body;

  console.log("NEW report body:", req.body);

  // Obtengo el user id mediante la ip de donde viene el reporte
  db.query(
    'SELECT id FROM users WHERE ip_address = "181.191.65.250"',
    (err, result) => {
      if (err) {
        console.log("LA IP ERROR:", err);
      }
      console.log("LA IP:", result);

      let user_id = result[0].id;

      const report = {
        user_id,
        fqdn,
        fechayhora: new Date(),
      };
      console.log("Report: ", report);
      // Inserta el reporte en la db
      db.query("INSERT INTO reports SET ?", report, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Report creation failed" });
        }

        return res.status(201).json({ message: "Report created successfully" });
      });
    }
  );
};

// Get all reports
exports.getAllReports = (req, res) => {
  db.query(
    "SELECT * FROM reports WHERE status = ? ",
    ["abierto"],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching reports" });
      }

      return res.status(200).json(rows);
    }
  );
};

// Retorna si un sitio es pornografico
exports.isPorn = (req, res) => {
  const { fqdn } = req.body;

  db.query(
    "SELECT * FROM fqdn WHERE name = ? AND isPorn = ?",
    [fqdn, "yes"],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching fqdn" });
      }
      if (rows.length > 0) {
        return res.status(200).json({ isPorn: true });
      } else {
        return res.status(200).json({ isPorn: false });
      }
    }
  );
};

// Modificar estado del reporte
exports.updateReportState = (req, res) => {
  const reportId = req.params.id;
  const { status } = req.body;

  // Verifico valor del status
  if (!status || !["abierto", "cerrado", "revision"].includes(status)) {
    console.log("Invalid status provided");
    return res
      .status(400)
      .json({ error: 'status debe ser "abierto", "cerrado", o "revision"' });
  }

  // Actualizo los datos en la db
  db.query(
    "UPDATE reports SET status = ? WHERE id = ?",
    [status, reportId],
    (err, result) => {
      if (err) {
        console.error("Error updating status of report by ID:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Report not found" });
      }

      return res
        .status(200)
        .json({ message: "Report status updated successfully" });
    }
  );
};
