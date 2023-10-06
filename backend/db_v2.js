/* Modulo para la conexion a la base de datos */
const mysql = require('mysql')
//const mysql = require('@mysql/xdevapi')

class Database {
	constructor(config){
		//console.log(config)
		this.connection = mysql.createPool({
			connectionLimit: config.connectionLimit,
			connectTimeout: 40000,
			acquireTimeout: 40000,
			timeout: 40000,
			host: config.host,
			user: config.user,
			database: config.database,
			password: config.pass
		})
	}
	query(sql,params){
		return new Promise((resolve,reject) => {
			this.connection.query(sql,params,(err,rows) => {
				if(err)
					reject(err)
				else
					resolve(rows)
			})
		})
	}
	is_connected(){
		console.log(this.connection)
		return(this.connection != undefined)
	}
	close(){
		return new Promise((resolve,reject) => {
			this.connection.end(err => {
				if(err)
					return reject(err)
				resolve()
			})
		})
	}
}

module.exports = Database
