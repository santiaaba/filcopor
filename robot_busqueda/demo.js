let p = new Promise((resolv,reject)=>{
	console.log("Aca comenzamos")
	resolv("Entro en resolv")
})

p.then(ok=>{
	console.log(ok)
})
.catch(error=>{
	console.log(error)
})
