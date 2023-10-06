const dotenv = require('dotenv').config()
const https = require('https')
const http = require('http')
const dns = require("dns")
const Database = require('./db_v2.js')
const httpClient = require('../libs/httpClient')
const config = require('./config.js')

const regex = /href=[\"\'](https?):\/\/([^\"\/\?\%\s\']+)([^\"\']*)[\"\']/gi
const regex_r = /\.(png|jpg|gif|css|js|svg|webp)$/
//const regex_d = /[^\.]*\.(.*)$/
const regex_d = /^[\w\-]*\.([\w\-\.]*)$/

const ENDLEVEL = 3
const CANTLINKS = 50
const SLEEP = 5000

const dnsResolver = new dns.Resolver({
	timeout: 1000,
	tries: 2
})

let yarevisados = []

function sleep(ms){
	console.log("Aguardamos ",ms/1000,"segundos")
	return new Promise((resolv)=>{
		setTimeout(resolv,ms)
	})
}

function reduceCNAME(fqdn){
	/* Reduce un CNAME hasta retornar la URL
		que ya no responde con un CNAME */
	//console.log("Reduciendo CNAME:",fqdn)
	return new Promise((resolv,reject)=>{
		//console.log("buscando CNAME:",fqdn)
		dnsResolver.resolveCname(fqdn,(err,url)=>{
			//console.log("hemos resuelto CNAME:",fqdn)
			if(!err){
				reduceCNAME(url[0])
				.then(ok=>{
					resolv(ok)
				})
				.catch(err=>{
					reject(err)
				})
			} else {
				//console.log("ERR:",err.code)
				if(err.code == "ENODATA"){
					//console.log("reducido a :",fqdn)
					resolv(fqdn)
				} else {
					reject("ERROR de resolucion CNAME")
				}
			}
		})

	})
}

function getDomain(fqdn,original){
	/* Dado un fqdn retorna el primer subdominio.
		Para ellos consulta el NS del fqdn pasado por
		parámetro. Si responde con un conjunto de registros
		ns entonces consideramos que el fqdn es un dominio.
		Si responde con error entonces es un host y no un
		dominio y buscamos de forma recursiva. Hay casos
		como www.tube8.fr que al preguntar por los NS responde
		con un conjunto de registros cuando en realidad
		esperaríamos que no fuese así. Ésto es porque
		www.tube8.fr es en realidad un CNAME de tube8.fr.
		Es por ello que primero debemos reducir el CNAME. */
		/* Se verifica no entrar en un loop infinito */

	//console.log("--------------------------")
	//console.log("getDomain:",fqdn,original)
	return new Promise((resolv,reject)=>{
		let r = regex_d.exec(fqdn)
		if(!r){
			reject("fqdn invalido!")
		} else {
			if (fqdn == original)
				reject("getDomain - Recursividad comprometida:",fqdn,original)
			else {
				reduceCNAME(fqdn)
				.then(ok=>{
					dnsResolver.resolveNs(ok,(err,addr)=>{
						if(err != null){
							let r = regex_d.exec(ok)
							if(r){
								if (ok == original){
									reject("No hay dominio")
								} else {
									getDomain(r[1],original?original:fqdn)
									.then(ok=>{
										resolv(ok)
									})
									.catch(err=>{
										reject(err)
									})
								}
							} else {
								reject("No hay dominio")
							}
						} else {
							resolv(ok)
						}
					})
	
				})
				.catch(err=>{
					reject("No hay dominio")
				})
			}
		}
	})
}

function searching(fqdn,path,level){
	/* Se encarga de buscar de forma recursiva URLs
		de recursos que sean de nuestro interes. De
		momento descartamos imágenes ya que son
		fásiles de distinguir */

	return new Promise((resolv,reject)=>{
		let client

		if(level == ENDLEVEL){
			resolv(true)	/* Salida recursiva */
		} else {
	
			var sites = []
	
			console.log("Entrando a:",fqdn + path,"(level ",level,")")
			httpClient.getSite('http',fqdn,path)
			.then(async ok => {
				let match = null
				let j = 0
				while((match = regex.exec(ok)) !== null && j < CANTLINKS) {
					if(!yarevisados.find(e => e == match['2'] + match['3'])){
						let match_r = regex_r.exec(match['3'])
						if(match_r == null){
							yarevisados.push(match['2'] + match['3'])
							sites.push({f1:match['2'],f2:match['3']})
						} else {
							console.log("Obviando: ",match['2'] + match['3'])
						}
					}
					j++
				}
				p = []
				sites.forEach(async s=>{
					p.push(searching(s.f1,s.f2,level+1))
				})

				if(p.length > 0)
					return Promise.all(p)
				else
					return new Promise((resolv)=>{resolv(true)})
			})
			.then(ok=>{
				resolv(true)
			})
			.catch(err=>{
				resolv(true)
				console.log("algo paso")
				console.log(err)
			})
		}
	})
}

function findSites(initial){
	/* Busca de forma recursiva URLs. Si initial
		no viene definido entonces busca en la DB
		una url a utilizar como semilla */
	return new Promise((resolv)=>{
		let p
		if(initial){
			console.log("Tenemos inicial:",initial)
			p = new Promise((resolv)=>{resolv(initial)})
		} else {
			console.log("Sin inicial. Buscamos en la DB.")
			p = db.query("call findSeed()")
		}
		p.then(seed=>{
			let ss
			if(seed[0][0].name)
				ss = seed[0][0].name
			else
				ss = seed
			console.log("Semilla: ",ss)
			searching(ss,"/",0)
			.then(async ok=>{
				console.log("------- SITIOS ENCONTRADOS ----------")
				let myReg = /[^\/]*/i
				let unicos = []
				yarevisados.forEach(s=>{
					let r = myReg.exec(s)
					if(r != null)
						if (!unicos.find(a => a == r[0]))
							unicos.push(r[0])
				})
				/* Intentamos agregar a la DB cada uno de ellos. */
				console.log("UNICOS:",unicos)
				let p = []
				let j = 0
				unicos.forEach(u=>{
					p.push(
						new Promise((resolv)=>{
							getDomain(u)
							.then(d=>{
								//console.log("getDomain: ",d)
								resolv({site:u,domain:d})
							})
							.catch(err=>{
								resolv()
							})
						})
					)
				})
				return Promise.all(p)
			})
			.then(ok=>{
				console.log("Ya tenemos los dominios!!!! Agregamos a la DB")
				let p = []
				ok.forEach(d=>{
					if(d){
						p.push(
							new Promise((resolv)=>{
								console.log("Agregando a la DB:",d.domain)
								db.query("insert into fqdn(name,domain) values(?,?)",[d.site,d.domain])
								.then(ok=>{
									//console.log("Agregado")
									resolv({value:true,messaje:"Agregando: " + d.domain})
								})
								.catch(err=>{
									//console.log(err)
									resolv({value:false,messaje:"Repetido: " + d.domain})
								})
							})
						)
					}
				})
				return Promise.all(p)
			})
			.then(ok =>{
				console.log("Todo agregado a la DB")
				let cant=0
				ok.forEach(r=>{
					if(r.value)
						cant++
					console.log(r)
				})
				console.log("---------------------------------------------------")
				console.log("TOTAL encontradas:",ok.length," agregadas:",cant)
				console.log("---------------------------------------------------")
				resolv()
			})
			.catch(err=>{
				console.log("ERROR FATAL; ",err)
				resolv()	/* Para salir de la promesa */
			})
		})
		.catch(err=>{
			console.log("ENTRO por aca el error")
			console.log(err.sqlMessage)
			resolv()	/* Para salir de la promesa */
		})
	})
}
	
async function main(){
	db = new Database(config.db);
	if(process.argv[2]){
		console.log("Semilla inicial:",process.argv[2])
		yarevisados.push(process.argv[2])
		await findSites(process.argv[2])
		db.close()
	} else {
		while(true){
			yarevisados = []
			await findSites()
			await sleep(SLEEP)	/* 10 segundos */
		}
	}
}

/*************************
         MAIN
 *************************/

/*
getDomain(process.argv[2])
.then(ok=>{
	console.log("OK",ok)
})
.catch(err=>{
	console.log("catch",err)
})
*/
main()
