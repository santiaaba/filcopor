const https = require('https')
const http = require('http')

module.exports = {

getSite: function(protocol,fqdn,path,level){
	/* El cuarto parámetro no se pasa por defecto
		y se utiliza para controlar que no ocurra una
		recurrencia infinita */
	console.log("GET SITE - protocol:",protocol,"- fqdn:",fqdn,"- path:",path,"- level:",level)
	return new Promise((resolv,reject)=>{
		//console.log("GET SITE entro")
		if(level && level == 10){
			/* Salida recursiva porque ha entrado en un loop infinito */
			reject("Error de redireccion. Recursividad excedida")
			return
		}

		let client = http
		let vars = {
			hostname: fqdn,	/* Debe si o si ir sin "http://" */
			port: 80,
			path: path,
			method:'GET',
			agent:false,
			timeout: 10000
		}

		if(protocol == 'https'){
			client = https
			vars.port = 443
			vars['rejectUnauthorized'] = false
      	vars['requestCert'] = true
		}

		let content=""
		let request = client.get(vars, (res)=>{
			if(res.statusCode == 301 || res.statusCode == 302){
				console.log("Redirigiendo: ", res.headers.location, "statusCode:",res.statusCode)
				let r = /^(https?)?:?(\/\/)?([^\/\?:]*)(.*)/	/* Esto es mucho muy importante */
				let match = r.exec(res.headers.location)
				//console.log("MATCH:",match)
				console.log("MATCH[4]:",match[4])

				/* Redireccion donde Cambiamos el fqdn */
				//console.log("Tenemos todo como para redirigir")
				/* Tenemos todo como para redirigir */
				console.log("REDIRIGIMOS:",match[1]?match[1]:protocol,match[3],match[4],level?level+1:1)
				module.exports.getSite(
					match[1]?match[1]:protocol,
					match[3]?match[3]:fqdn,
					match[4],
					level?level+1:1
				)
				.then(ok=>{
					resolv(ok)
				})
				.catch(err=>{
					reject(err)
				})
			} else {
				//console.log("Trayendo datos del sitio: ",fqdn + path)
				res.on("data", function (data) {
					content = content + data
				})
				res.on("end", function(){
					//console.log("Termino traida de datos")
					resolv(content)
				})
				res.on("error", function(e){
					console.log("ERROR:",e)
					reject(e)
				})
			}
		})
		request.end()

		request.on('timeout', () => {
			request.destroy();
		})

		request.on('error', function(e) {
			//console.log(e)
			console.error("ERROR => protocol:",protocol,"fqdn:",fqdn,"path:",path,"Error:",e.code);
			reject(e.code)
		})
	})
}
}
