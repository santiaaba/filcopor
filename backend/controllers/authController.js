const jwt = require("jsonwebtoken");
const db = require("../db");

// Secret key for JWT
const secretKey = "P0)aHX?SHfqLfkmKU=iwH.JRbfFF#!j5"; // No deberia estar hardcoded

// Registra un nuevo usuario
exports.register = (req, res) => {
  const { email, password, nomape, telefono, id_ciudad } = req.body;

  // Verifica los campos no esten vacios
  if (
    !email ||
    !password ||
    !nomape ||
    !telefono ||
    !id_ciudad ||
    email.trim() === "" ||
    password.trim() === "" ||
    nomape.trim() === "" ||
    telefono.trim() === ""
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Verifica que el email tenga el siguiente patron
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Verifica que el email no exista en la base de datos
  db.query("SELECT * FROM users WHERE email = ?", email, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Registration failed" });
    }

    if (rows.length > 0) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    db.query(
      "INSERT INTO users(email,password,nomape,telefono,id_ciudad) values(?,?,?,?,?)",
      [email, password, nomape, telefono, id_ciudad],
      (err, result) => {
        if (err) {
          console.log("ERROR:", err);
          return res.status(500).json({ error: "Registration failed" });
        }

        return res.status(201).json({ message: "Registration successful" });
      }
    );
  });
};

// Logea a un usuario
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    async (err, rows) => {
      if (err) {
        console.log("login: error", err);
        return res.status(500).json({ error: "Login failed" });
      }

      if (rows.length !== 1) {
        console.log("login: rows.length", rows.length);
        return res.status(401).json({ error: "Authentication failed" });
      }

      const user = rows[0];
      const userInformation = {
        id: rows[0].id,
        role: rows[0].role,
      };

      // Genera un JWT token
      const token = jwt.sign(
        { email: user.email, role: user.role, user_id: user.id },
        secretKey,
        { expiresIn: "12h" }
      );
      return res.status(200).json({
        userInformation,
        token,
        message: "Login successful",
      });
    }
  );
};

// Deslogea e invalida el token
// habria que añadirlo a una blacklist tambien
exports.logout = (req, res) => {
  // TO DO
  return res.status(200).json({ message: "Logout successful" });
};
