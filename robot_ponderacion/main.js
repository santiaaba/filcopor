const dotenv = require('dotenv').config()
const https = require('https')
const http = require('http')
const Database = require('./db_v2.js')
const config = require('./config.js')
const rules = require('./rules.js')
const httpClient = require('../libs/httpClient')

const MAX_ROWS = 10

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
			if(ok.length > 0)
				console.log("Sitios a ponderar:",ok)
			else {
				console.log("No hay sitios a ponderar")
				resolv()
			}
			ok.forEach(s=>{
				/* Buscamos el codigo */
				httpClient.getSite('http',s.name)
				.then(ok=>{
					console.log("ENTROOOOOO A PONDERAR: ",s.name)
					/* Ponderamos */
					//Removemos los saltos de página y mas de dos espacios en blanco
					let str = ok.replace(/\r?\n|\r/g," ");
					str = str.replace(/\s\s+/g," ");
					//console.log(str)
					return ponderation(s,str)
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
	
					console.log("TOTAL:",total,"- Es porno:",isPorn,"- Id en la DB:",s.id)
					return db.query("update fqdn set ponderation=?,isPorn=? where id=?",
							[total,isPorn,s.id])
				})
				.then(ok=>{
					resolv()
				})
				.catch(err=>{
					console.log("ERROOOOR AL OBTENER EL SITIO: ",s.name,"(",err,")")
					db.query("update fqdn set isPorn='inexist' where id=?",[s.id])
					.then(ok=>{
						resolv()
					})
					.catch(err=>{
						console.log(err)
						resolv()
					})
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

console.log("Conectando con la DB:",config.db.host)
db = new Database(config.db);

async function main(){
	let site = process.argv[2]
	if(!site){
		while(true){
			console.log("Iniciamos")
			await ponderamos()
			console.log("Esperamos")
			await sleep(5000)   /* 5 segundos */
		}
	} else {
		await ponderamos(site)
		console.log("Terminamos de ponderar",site)
	}
	db.close()
}

main()
