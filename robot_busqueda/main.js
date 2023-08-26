const https = require('https')
const http = require('http')
const dns = require("dns")
const Database = require('./db_v2.js')
const httpClient = require('../libs/httpClient')
const config = require('./config.js')

const regex = /href=\"(https?):\/\/([^\"\/\?]+)([^\"]*)\"/gi
const regex_r = /\.(png|jpg|gif|css|js|svg|webp)$/
const regex_d = /[^\.]*\.(.*)$/

const ENDLEVEL = 3
const CANTLINKS = 50

let yarevisados = new Array()

function sleep(ms){
	console.log("Aguardamos ",ms/1000,"segundos")
	return new Promise((resolv)=>{
		setTimeout(resolv,ms)
	})
}

function reduceCNAME(fqdn){
	/* Reduce un CNAME hasta retornar la URL
		que ya no responde con un CNAME */
	return new Promise((resolv,reject)=>{
		dns.resolveCname(fqdn,(err,url)=>{
			if(!err){
				/* Continuamos reduciendo */
				reduceCNAME(url[0])
				.then(ok=>{
					resolv(ok)
				})
			} else {
				resolv(fqdn)
			}
		})
	})
}

function getDomain(fqdn){
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

	//console.log("getDomain:",fqdn)
	return new Promise((resolv,reject)=>{
		reduceCNAME(fqdn)
		.then(fqdn=>{
			dns.resolveNs(fqdn,(err,addr)=>{
				if(err != null){
					let r = regex_d.exec(fqdn)
					if(r){
						getDomain(r[1])
						.then(ok=>{
							resolv(ok)
						})
						.catch(err=>{
							reject(err)
						})
					} else {
						reject("No hay dominio")
					}
				} else {
					resolv(fqdn)
				}
			})
		})
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
			//yarevisados.push(fqdn + path)
			httpClient.getSite('http',fqdn,path)
			.then(async ok => {
				let match = null
				let j = 0
				while((match = regex.exec(ok)) !== null && j < CANTLINKS) {
					if(!yarevisados.find(e => e == match['2'] + match['3'])){
						let match_r = regex_r.exec(match['3'])
						//console.log(match_r)
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
					//await searching(s.f1,s.f2,level+1)
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
				//while(j< unicos.length){
				//	j++
				//}
					p.push(
						new Promise((resolv)=>{
							getDomain(u)
							.then(d=>{
								//console.log("getDomain: ",d)
								resolv({site:u,domain:d})
							})
							.catch(err=>{
								//console.log("getDomain ERROR: ",err)
								resolv()
							})
						})
					)
				})
				return Promise.all(p)
			})
			.then(ok=>{
				let p = []
				ok.forEach(d=>{
					if(d){
						p.push(
							new Promise((resolv)=>{
								db.query("insert into fqdn(name,domain) values(?,?)",[d.site + ".",d.domain])
								.then(ok=>{
									resolv({value:true,messaje:"Agregando: " + d.domain})
								})
								.catch(err=>{
									resolv({value:false,messaje:"Repetido: " + d.domain})
								})
							})
						)
					}
				})
				return Promise.all(p)
			})
			.then(ok =>{
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
	
/*************************
         MAIN
 *************************/

db = new Database(config.db);

/* Seleccionamos una página semila de la DB. Tratamos
	que sea de forma random y de caracter pornográfico
	que que son las que en realidad nos interesan */

async function main(){
	let initial = process.argv[2]
	let yarevisados = []
	if(process.argv[2]){
		console.log("Semilla inicial:",process.argv[2])
		await findSites(initial)
		db.close()
	} else {
		while(true){
			console.log("Semilla inicial:",process.argv[2])
			await findSites(initial)
			initial = null
			console.log("Esperamos")
			await sleep(10000)	/* 10 segundos */
		}
	}
}

/*   DE rueba  */
/*
getDomain('www.eroticlive.nl')
.then(ok=>{console.log("FIN DOMINIO:",ok)})
.catch(err=>{console.log("FIN ERROR:",err)})
*/

main()
