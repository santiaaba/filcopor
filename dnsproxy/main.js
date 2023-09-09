"use strict";

const dotenv = require('dotenv').config()
const {Resolver} = require('dns')
const dns = require('native-node-dns')
const packet = require('native-dns-packet');
const lmdb = require('lmdb')
const async = require('async')
const config = require('./config.js')
const Database = require('./db_v2.js')

var SERVFAIL = packet.consts.NAME_TO_RCODE.SERVFAIL;

let ips = []
let tcpservers = []
let udpservers = []
let myDB

let db = new Database(config.db);

const resolver = new Resolver()
resolver.setServers(['8.8.8.8'])

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
			console.log(err)
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
	//console.log("Includes ip:",ip,"result:",ips.includes(ip))
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
		//console.log("LO es?:",myDB.get(fqdn))
		fqdn = partes[i] + "." + fqdn
		isPorn = myDB.get(fqdn)
		i--
	}
	console.log("itIsPorn:",question,"=",isPorn)
	return isPorn;
}

//let authority = { address: config.recursive.dns1, port: 53, type: 'udp' }

function request(protocol,outerRequest,outerResponse){

	var innerRequest = dns.Request({
		question: outerRequest.question[0],
		server: {
			address: '8.8.8.8',
			type: protocol,
			port: 53,
		},
		cache: false,
	})

	function requestDone() {
		try {
			outerResponse.send();
		} catch(e){
			console.log("FALLO")
		} 
	}

	innerRequest.send();

	innerRequest.on('message', function (err, innerResponse) {
		//console.log('response', err, innerResponse.question[0], innerResponse.header.tc)
		if(err){
			console.log("HAY ERRROR!!!!!")
		}

		outerResponse.header.rcode = innerResponse.header.rcode;
		outerResponse.header.tc = innerResponse.header.tc;

		outerResponse.answer = innerResponse.answer;
		outerResponse.additional = innerResponse.additional;
		outerResponse.authority = innerResponse.authority;
	})

	innerRequest.on('end', function() {
		if(outerResponse.header.tc == 1){
			//console.log("VA TRUNCADO")
			request('tcp',outerRequest,outerResponse)
		} else {
           	requestDone();
		}
	})
}


function proxy(outerRequest, outerResponse, logged) {
	/*Se encarga de verificar si la consulta corresponde
		a un sitio pornográfico para una consulta del tipo "A".
		Caso contrario traspasa la query a un DNS recursivo */

	console.log('Request', outerRequest.question[0].name)
	if(!logged){
		/* La ip no se reconoce como autenticada.
			Si se trata de una clase A retornamos
			la ip del portal cautivo. Caso contrario
			retornamos sin sección se ANSWER */
		if(outerRequest.question[0].type == 1){
			outerResponse.answer.push(
				dns.A({
					name: outerRequest.question[0].name,
					address: config.cautive_loggin,
					ttl: 600,
				})
			)
		}
		outerResponse.send()
		return
	}

	if(itIsPorn(outerRequest.question[0].name) && outerRequest.question[0].type == 1){
		console.log(outerRequest.question[0].name," es PORNO!!!!!!")
		/* Si es porno entonces retornamos una
			ip de portal cautivo */
		outerResponse.answer.push(
			dns.A({
				name: outerRequest.question[0].name,
				address: config.cautive,
				ttl: 600,
			})
		)
		outerResponse.send()
	} else {
		/* NO es porno */
		console.log('request', outerRequest.question[0].name, outerRequest._socket._socket.type)

		request('udp',outerRequest,outerResponse)
	}

}

function handleRequest(request,response){
	/* Maneja una query de DNS */
	let logged = isLogged(request.address.address)

	proxy(request,response,logged)
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

console.log("Levantando DB mysql")
db_load()
.then(ok=>{
	console.log("Base de datos Mysql levantada")

	try{
		console.log("Levantando base de datos lmdb")
		myDB = lmdb.open({
			path: config.lmdb.name,
			compression: true,
		})
		console.log("Base de datos lmdb levantada")

		config.ips.forEach(ip=>{
			let tcpserver = dns.createTCPServer()
			let udpserver = dns.createServer()

			udpserver.on('request', handleRequest)
			udpserver.on('error', onError)
			udpserver.on('listening', onListening)
			udpserver.on('socketError', onSocketError)
			udpserver.on('close', onClose)
			udpserver.serve(53,ip)
	
			tcpserver.on('request', handleRequest)
			tcpserver.on('error', onError)
			tcpserver.on('listening', onListening)
			tcpserver.on('socketError', onSocketError)
			tcpserver.on('close', onClose)
			tcpserver.serve(53,ip)
	
			tcpservers.push(tcpserver)
			udpservers.push(udpserver)
		})

	} catch(e){
		console.log("ENTRO en catch")
		throw(e)
	}
})
.catch(err=>{
	console.log(err)
	process.exit(1)
})


