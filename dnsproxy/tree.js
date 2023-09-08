/* Implementacion de cache */

class DNS_cache{
	constructor(){
		this.db = []
	}

	add(request,response){
		let d = {
			request: request,
			response: response
		}
		this.db.push(d)
	}

	search(data){
		let d = this.db.find(d=> d.request.name == data.request.name)
		if(d){
			if(d.)
		} else {
			return null
		}
	}
}

class TreeNode{
	constructor(domain){
		this.domain = domain
		this.rrds = []
		this.children = []
	}

	add(data,index){
		/* index se utiliza para recorrer el
		   array data.domain */
		
		if(data.domain[index] == this.domain){
			
		} else {
			/* Buscamos el hijo */
			child = children.find(n=> )
		}
	}

	find(url,type){
	}

	delete(){
	}
}

export default DNS_cache
