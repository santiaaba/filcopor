const {sendError} = require('./help.js')

module.exports = {

login: function(req,res){
	db.query("call login(?,?)",[req.body.username,req.body.passwd])
	.then(token=>{
		res.send(token[0][0])
	})
	.catch(err=>{
		console.log(err)
		sendError(res,err)
	})
},

logout: function(req,res){
	sendError(res,"Implementar")
},

restore: function(req,res){
	sendError(res,"Implementar")
},

registry: function(req,res){
	sendError(res,"Implementar")
},

unregistry: function(req,res){
	sendError(res,"Implementar")
}

}
