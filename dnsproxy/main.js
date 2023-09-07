"use strict";

const dns = require('native-dns')
const lmdb = require('lmdb')
const async = require('async')
const config = require('./config.js')
const Database = require('./db_v2.js')

let ips = []
let tcpserver = dns.createTCPServer()
let udpserver = dns.createServer()
let myDB

let db = new Database(config.db);

function db_load(){
	return new Promise((resolv,reject)=>{
	/* Levanta de la base de datos todas las ip
		permitidas para usar la solución */

		db.query("call load_ip()")
		.then(ok=>{
			ok[0].forEach(p=>{
				ips.push(p.ip)
			})
			console.log("IPS:",ips)
			resolv("Ips cargadas de la base de datos")
		})
		.catch(err=>{
			reject("Error al cargar las ip desde la base de datos")
		})
	})
}

function db_save_ip(){
	/* Salva en la base de datos una ip autenticada */
}

function isLogged(ip){
	/* De momento siempre suponemos que
		el usuario está autenticado */
	console.log("Includes ip:",ip,"result:",ips.includes(ip))
	return !ips.includes(ip)
}

function itIsPorn(question){
	let partes = question.split('.')
	let i = partes.length
	let isPorn = undefined
	let fqdn = ""
	let ja

	i--	/* Ya que los array posee -1 elementos informados por length */
	while(isPorn == undefined && i > -1){
		fqdn = partes[i] + "." + fqdn
		isPorn = myDB.get(fqdn)
		i--
	}
	return isPorn;
}

let authority = { address: config.recursive.dns1, port: 53, type: 'udp' }

function proxy(question, response, cb, logged) {
	/*Se encarga de verificar si la consulta corresponde
		a un sitio pornográfico para una consulta del tipo "A".
		Caso contrario traspasa la query a un DNS recursivo */

	if(!logged){
		/* La ip no se reconoce como autenticada.
			Si se trata de una clase A retornamos
			la ip del portal cautivo. Caso contrario
			retornamos sin sección se ANSWER */
		if(question.type == 1){
			response.answer.push(
				dns.A({
					name: question.name,
					address: config.cautive_loggin,
					ttl: 600,
				})
			)
		}
		response.send()
		return
	}

	if(itIsPorn(question.name) && question.type == 1){
		console.log("Pooooorno!!!")
		/* Si es porno entonces retornamos una
			ip de portal cautivo */
		response.answer.push(
			dns.A({
				name: question.name,
				address: config.cautive,
				ttl: 600,
			})
		)
		response.send()
	} else {
		console.log("No es porno!!!")

		//console.log(question)

		var request = dns.Request({
			question: question,	// forwarding the question
			server: {
				address: config.recursive.dns1,
				port: 53,
				type: 'udp'
			},
			timeout: 1000
		})

		request.on('message', (err, msg) => {
			if(err){
				console.log("ERROR:",err)
			}
			msg.answer.forEach(a => response.answer.push(a));
		});

		//console.log("Response: ",response)
		request.on('end', cb);
		request.send();
	}
}

function handleRequest(request,response){
	/* Maneja una query de DNS */
	console.log('request from', request.address.address, 'for', request.question[0].name);

	let logged = isLogged(request.address.address)
	let f = []

	request.question.forEach(question=>{
		f.push(cb => proxy(question,response,cb,logged))
	})

	async.parallel(f,function(){response.send()})
}


const onError = function (err, buff, req, res) {
  console.log(err.stack)
}

const onListening = function () {
  console.log('server listening on', this.address());
};

const onSocketError = function (err, socket) {
  console.log(err);
};

const onClose = function () {
  console.log('server closed', this.address());
};

/************************
			MAIN
************************/

db_load()
.then(ok=>{
	console.log(ok)

	try{
		myDB = lmdb.open({
			path: config.lmdb.name,
			compression: true,
		})

		udpserver.on('request', handleRequest)
		udpserver.on('error', onError)
		udpserver.on('listening', onListening)
		udpserver.on('socketError', onSocketError)
		udpserver.on('close', onClose)
		udpserver.serve(53, config.ip)

		tcpserver.on('request', handleRequest)
		tcpserver.on('error', onError)
		tcpserver.on('listening', onListening)
		tcpserver.on('socketError', onSocketError)
		tcpserver.on('close', onClose)
		tcpserver.serve(53, config.ip)

	} catch(e){
		console.log("ENTRO en catch")
		throw(e)
	}
})
.catch(err=>{
	console.log(err)
	process.exit(1)
})


