const dotenv = require('dotenv').config()
const config = require('./config.js')
const Database = require('./db_v2.js')
const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const fqdn = require('./fqdn.js')
const user = require('./user.js')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const statesRoutes = require('./routes/statesRoutes');
var app = express()

/*****************************
 *		Main		git ig
 *****************************/

app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => { console.log("Llego consulta", req.url); next() })
app.use((req, res, next) => { console.log("Llego Body:", req.body); next() })

//db = new Database(config.db);

var path = "/v1/"

/* para el login y logout */
//app.post(path + "user/login", user.login)
//app.get(path + "user/logout", user.logout)

/* Recupero de contraseña */
app.post(path + "restore", user.restore)

/*******************************
		Para el usuario final
*******************************/

/* Para reportar un fqdn */
app.post(path + "fqdn/report", fqdn.report)

/* Para consultar si un fqdn es o no pornográfico */
app.get(path + "fqdn/search", fqdn.search)

// para acciones relacionadas a la autenticacion del usuario
app.use('/auth', authRoutes);
// para acciones relacionadas al usuario
app.use('/user', userRoutes);
// para acciones relacionadas a los reportes
app.use('/report', reportRoutes);
// para acciones relacionadas a las regiones geograficas
app.use('/states', statesRoutes);


app.post(path + "registry", user.registry)
app.delete(path + "registry/:userid", user.unregistry)


/*******************************
		Para el usuario Admin
*******************************/
/* Para listar los fqdn reportados por los usuarios */
app.get(path + "admin/fqdn/report", fqdn.reported)

/* Para aceptar, cancelar u obviar un fqdn reportado */
app.put(path + "admin/fqdn/report/:id", fqdn.attend_report)

/***********************************/
app.listen(config.port, function () {
	console.log("Server running")
	console.log('CORS-enabled')
})

