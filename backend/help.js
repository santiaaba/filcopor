//const restClient = require("./restClient.js");
const Validator = require("jsonschema").Validator;
const axios = require("axios");
const https = require('https')


module.exports = {
	apiCall: function (host, port, method, url, headers, body) {
		// host debe incluir el protocolo. ej: "https://10.40.12.21"
		const r = /^(https?):\/\/.*/

		let rr = r.exec(host)
		let client
		if(!rr){
			return new Promise((resolv,reject)=>{
				reject({ message: "apiCall - url invalida " + host })
			})
		}
		/* Retorna una promesa para la accion indicada */
		console.log("ApiCall: ", host, " - ", method, ":", url);
		const instance = axios.create({
			httpAgent: (rr[1] == "https")?new https.Agent({
				rejectUnauthorized: false,
			}):null,
			baseURL: host + ":" + port,
			timeout: 20000,
			headers: headers,
		})

		switch (method) {
			case "GET":
				return instance.get(url);
			case "POST":
				return instance.post(url, body);
			case "PUT":
				return instance.put(url, body);
			case "PATCH":
				return instance.patch(url, body);
			case "DELETE":
				return instance.delete(url);
			default:
				throw { message: "ApiCall: Metodo no admitido: " + method };
		}
	},

	verifyToken: function (req, res, next) {
		if (req.headers.token == undefined)
			module.exports.sendError(res, {
				status: 401,
				custom: "Falta el token en el header",
			});
		else next();
	},

	sendError: function (res, err) {
		if (err.sqlMessage) {
			if (err.status)
				res.status(err.status).json({ message: err.sqlMessage });
			else
				res.status(400).json({ message: err.sqlMessage });
		} else if (typeof err == "string") {
			res.status(400).json({ message: err });
		} else if (err.custom) {
			res.status(err.status).json({ message: err.custom });
		} else if (err.response) {
			/* Para errores provenientes de una api llamada */
			if (err.response.data.sqlMessage)
				res.status(err.response.status).send({ message: err.response.data.sqlMessage })
			else
				res.status(err.response.status).json(err.response.data)
		} else if (err.message) {
			if (err.status)
				res.status(err.status).json({ message: err.message });
			else
				res.status(400).json({ message: err.message })
		} else if (err.body && err.status) {
			res.status(err.status).json({ message: err.body });
		} else {
			//console.log("No existe err.message")
			/* Para errores indefinidos */
			res.status(400).json("Error indefinido");
		}
	},

	dateToMysqlDate: function (date) {
		var aux =
			date.getUTCFullYear() +
			"-" +
			("00" + (date.getUTCMonth() + 1)).slice(-2) +
			"-" +
			("00" + date.getUTCDate()).slice(-2) +
			" " +
			("00" + date.getUTCHours()).slice(-2) +
			":" +
			("00" + date.getUTCMinutes()).slice(-2) +
			":" +
			("00" + date.getUTCSeconds()).slice(-2);
		console.log(aux);
		return aux;
	},

	validate: function (data, schema) {
		return new Promise((resolv, reject) => {
			v = new Validator();
			var valid = v.validate(data, schema);
			if (valid.valid) {
				resolv(true);
			} else {
				var message = "Datos invalidos: ";
				valid.errors.forEach((error) => {
					message += error.message + "; ";
				});
				reject(message);
			}
		});
	},

	iam: async function (req, res, next, back) {
		/* Comprueba token en header y devuelve
			los datos del usuario */
		try {
			if (req.headers.token) {
				let user = await module.exports.apiCall(
					back.host,
					back.port,
					"GET",
					"/v1/back/iam/iam",
					{ token: req.headers.token },
					{}
				);
				req.user = user.data
				return next()
			} else {
				throw 'falta el token en el header'
			}
		} catch (err) {
			console.log(err);
			if(err.response)
				err.response.status = 401
			module.exports.sendError(res, err)
		}
	}
}
