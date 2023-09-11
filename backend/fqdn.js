const {sendError} = require('./help.js')

validDomain = /([\w\d\-]\.)+([\w\d\-])/i

const auth_user = (token) => {
	/* Dado un token, verifica si esté autenticado
		y retorna el id de usuario */

	return new Promise((resolv,reject)=>{
		db.query("call is_loging(?)",[token])
		.then(ok=>{
			resolv(ok[0])
		})
		.catch(err=>{
			console.log(err)
			reject(err)
		})
	})
}

module.exports = {

report: function(req,res){
	
	auth_user(req.headers.token)
	.then(ok=>{
		return db.query("call add_report(?,?)",[req.body.fqdn,1])
	})
	.then(ok=>{
		res.send({message:"Reportado"})
	})
	.catch(err=>{
		console.log(err)
		sendError(res,err)
	})
},

search: function(req,res){

	if(!req.query.fqdn){
		sendError(res,"Debe especificar el fqdn. EJ: ?fqnd=www.google.com.ar)")
		return
	}

	auth_user(req.headers.token)
	.then(ok=>{
		console.log("USUARIO:",ok)

		/* Verificamos que sea un dominio válido con un subdominio
			dentro del dominio TLD (Top Level Domain) */
		if(!req.query.fqdn.match(validDomain))
			throw("Dominio inválido. Debe contener un subdominio dentro de un TLD. Ej: google.com")

		return db.query("call search_domain(?)",[req.query.fqdn])
	})
	.then(ok=>{
		console.log(ok)
		res.send(ok[0])
	})
	.catch(err=>{
		console.log(err)
		sendError(res,err)
	})
},

reported: function(req,res){
	sendError(res,"Implementar")
},

attend_report: function(req,res){
	sendError(res,"Implementar")
}

}
