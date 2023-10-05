const Validator = require('jsonschema').Validator;
const v = new Validator();

// Valida el schema para registro
const registerSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
};

// Valida el schema para login
const loginSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
};

// Valida el schema de un reporte
const reportSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', required: true },
    fqdn: { type: 'string', required: true },
    comentario: { type: 'string', required: false },
    valoracion: { type: 'integer', required: true },
  },
};

// Middleware para validar los datos del registro
exports.validateRegister = (req, res, next) => {
  const result = v.validate(req.body, registerSchema);
  if (!result.valid) {
    return res.status(400).json({ error: 'Invalid registration data' });
  }
  next();
};

// Middleware para validar los datos del login
exports.validateLogin = (req, res, next) => {
  const result = v.validate(req.body, loginSchema);
  if (!result.valid) {
    return res.status(400).json({ error: 'Invalid login data' });
  }
  next();
};

// Middleware para validar los datos de un reporte
exports.validateReport = (req, res, next) => {
  const result = v.validate(req.body, reportSchema);
  if (!result.valid) {
    return res.status(400).json({ error: 'Invalid report data' });
  }
  next();
};