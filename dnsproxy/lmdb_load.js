/*
	Codigo encargado de leer de la base de datos de
	Filcopor de la tabla fqdn y generar la base de
	datos de lectura rápida lmbd.

	De la tabla indicada solo nos interesan aquellos
	dominios que son reconocidos como pornográficos

	Los dominios se leen de la columna "domain" de la
	tabla fqdn. Se debe agregar el "." al final de
	cada string
*/

const dotenv = require('dotenv').config()
const lmdb = require('lmdb')
const Database = require('./db_v2.js')
const config = require('./config.js')

const cargando = async data =>{
	for (let l of data){
		console.log("Agregando: ",l.domain + ".")
		await myDB.put(l.domain + ".", 1)
		//console.log("AGRAGADO!!!:",myDB.get(l.name).someText)
	}
}

/*************************
			MAIN
 *************************/

db = new Database(config.db);

let myDB = lmdb.open({
	path: 'my-db',
	compression: true,
});

myDB.drop()
.then(ok=>{
	return db.query('select * from fqdn where isPorn = true')
})
.then( async ok=>{
	await cargando(ok)
	if(process.argv.indexOf('-d')> -1){
		console.log("Las keys son:")
		for (let	key of myDB.getKeys()){
			console.log("	",key)
		}
	}
	console.log("Base de datos generada:",ok.length,"keys cargadas")
	db.close();
	process.exit(0)
})
.catch(err=>{
	console.log(err)
	process.exit(1)
})
