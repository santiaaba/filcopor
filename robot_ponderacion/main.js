const https = require('https')
const http = require('http')
const dns = require('dns')
const Database = require('./db_v2.js')
const config = require('./config.js')
const rules = require('./rules.js')
const httpClient = require('../libs/httpClient')

const MAX_ROWS = 50

function sleep(ms){
	console.log("Aguardamos ",ms/1000,"segundos")
	return new Promise((resolv)=>{
		setTimeout(resolv,ms)
	})
}

function ponderation(site,content){
	return new Promise((resolv,reject)=>{
		//console.log(content)
		let pon=[]
		rules.forEach(r=>{
			//console.log("Revisando regla:",r)
			let m = content.match(r.r)
			if(m){
				//console.log("	",r.name,"p:",r.p,"cant:",m.length," - total:",r.p * m.length)
				pon.push({name:r.name,ponderation:r.p,cant:m.length})
			}
		})
		resolv({site:site,result:pon})
	})
}

function ponderamos(site){
	return new Promise((resolv,reject)=>{
		let p
		if(site)
			p = new Promise((resolv)=>{resolv([{name:site,id:-1}])})
		else
			p = db.query("select id,name from fqdn where isPorn = 'toPonderate' limit ?",[MAX_ROWS])
		p.then(ok=>{

			/* Para pruebas hardcodeamos */
			//ok = [{id:53,name:'twitter.com/porndudecasting'}]
			/**/

			console.log("Sitios a ponderar:",ok)
			ok.forEach(s=>{
				/* Buscamos el codigo */
				httpClient.getSite('http',s.name)
				.then(ok=>{
					console.log("ENTROOOOOO A PONDERAR: ",s.name)
					/* Ponderamos */
					return ponderation(s,ok)
				})
				.then(ok=>{
					let total = 0
					console.log("SITIO: ",ok.site)
					ok.result.forEach(p=>{
						total += p.ponderation * p.cant
						console.log("   ",p.name,"p:",p.ponderation,"cant:",
										p.cant," - total:",p.ponderation * p.cant)
					})
					/* Actualizamos la DB */
					let isPorn = 'no'
					//console.log(s.name,":",ok)
					if(total > config.threshold.max)
						isPorn = 'yes'
					else if(ok > config.threshold.middle)
						isPorn = 'undefined'
	
					console.log("TOTAL",total,isPorn,s.id)
					return db.query("update fqdn set ponderation=?,isPorn=? where id=?",
							[total,isPorn,s.id])
				})
				.then(ok=>{
					resolv()
				})
				.catch(err=>{
					console.log("ERROOOOR AL OBTENER EL SITIO: ",s.name,"(",err,")")
					console.log(err)
					if(err == 'ENOTFOUND' || err == 'EAI_AGAIN'){
						db.query("delete from fqdn where id=?",[s.id])
						.then(ok=>{
							resolv()
						})
						.catch(err=>{
							console.log(err)
							resolv()
						})
					}
				})
			})
		})
		.catch(err=>{
			console.log(err)
			resolv()
		})
	})
}


/*************************
         MAIN
 *************************/

db = new Database(config.db);

async function main(){
	let site = process.argv[2]
	if(!site){
		while(true){
			console.log("Iniciamos")
			await ponderamos()
			console.log("Esperamos")
			await sleep(10000)   /* 10 segundos */
		}
	} else {
		await ponderamos(site)
	}
}

main()
