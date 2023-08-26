"use strict";

const dns = require('native-dns')
const lmdb = require('lmdb')
const async = require('async')
const config = require('./config.js')

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

function proxy(question, response, cb) {
	if(itIsPorn(question.name)){
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
	console.log('request from', request.address.address, 'for', request.question[0].name);

	let f = []

	request.question.forEach(question=>{
		f.push(cb => proxy(question,response,cb))
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
let tcpserver = dns.createTCPServer()
let udpserver = dns.createServer()
let myDB

console.log("Levantando la base de datos")
try {
	myDB = lmdb.open({
		path: config.lmdb.name,
		compression: true,
	})
} catch (err){
	console.log(err)
	process.exit(1)
}

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
