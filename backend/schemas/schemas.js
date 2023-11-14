const Validator = require("jsonschema").Validator;
const v = new Validator();

// Valida el schema para registro
const registerSchema = {
  type: "object",
  properties: {
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    nomape: { type: "string", required: true },
    telefono: { type: "string", required: true },
    id_ciudad: { type: "integer", required: true },
  },
};

// Valida el schema para login
const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  },
};

// Valida el schema de un reporte
const reportSchema = {
  type: "object",
  properties: {
    fqdn: { type: "string", required: true },
  },
};

// Valida el schema de un fqdn
const fqdnSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 200 },
    isPorn: {
      type: "string",
      enum: ["yes", "no", "undefined", "toPonderate", "inexist"],
    },
    ponderation: { type: "integer" },
    domain: { type: "string", minLength: 1, maxLength: 200 },
  },
  required: ["name", "isPorn", "ponderation", "domain"],
};

// Middleware para validar los datos del registro
exports.validateRegister = (req, res, next) => {
  const result = v.validate(req.body, registerSchema);
  if (!result.valid) {
    console.log(result);
    return res.status(400).json({ error: "Invalid registration data" });
  }
  next();
};

// Middleware para validar los datos del login
exports.validateLogin = (req, res, next) => {
  const result = v.validate(req.body, loginSchema);
  if (!result.valid) {
    return res.status(400).json({ error: "Invalid login data" });
  }
  next();
};

// Middleware para validar los datos de un reporte
exports.validateReport = (req, res, next) => {
  const result = v.validate(req.body, reportSchema);
  if (!result.valid) {
    console.log("ERROR schema:", result);
    return res.status(400).json({ error: "Invalid report data" });
  }
  next();
};

// Middleware para validar los datos de un fqdn
exports.validateFqdn = (req, res, next) => {
  const result = v.validate(req.body, fqdnSchema);
  if (!result.valid) {
    console.log("ERROR schema:", result);
    return res.status(400).json({ error: "Invalid fqdn data" });
  }
  next();
};
