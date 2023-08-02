const express = require('express')
const Database = require("./libs/db_v2.js");
const bodyParser = require("body-parser")
const cors = require('cors')

var app = express()

/*****************************
 *		Main		
 *****************************/

app.use(bodyParser.json())
app.use(cors())

var path = "/v1/filcopor"


/* para el login y logout */
app.post(path + "/login", user.login)
app.get(path + "/logout", user.logout)

/*******************************
		Para el usuario final
*******************************/

/* Para eportar un fqdn */
app.post(path + "/fqdn/report", fqdn.report)

/* Para consultar si un fqdn es o no pornográfico */
app.get(path + "/fqdn/:fqdn", fqdn.search)

/* Para registrarse y desregistrarse */
app.post(path + "/registry", user.registry)
app.delete(path + "/registry/:userid", user.unregistry)

/*******************************
		Para el usuario Admin
*******************************/
/* Para listar los fqdn reportados por los usuarios */
app.get(path + "/fqdn/report", fqdn.reported)

/* Para aceptar, cancelar u obviar un fqdn reportado */
app.put(path + "/fqdn/report/:id", fqdn.attend_report)

/***********************************/
app.listen(config.port,function(){
	console.log("Server running")
	console.log('CORS-enabled')
})

