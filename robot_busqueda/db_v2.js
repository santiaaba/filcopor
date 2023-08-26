/* Modulo para la conexion a la base de datos */
const mysql = require('mysql')
//const mysql = require('@mysql/xdevapi')

class Database {
	constructor(config){
		//console.log(config)
		this.connection = mysql.createPool({
			connectionLimit: config.connectionLimit,
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
	query_transaction(connection,sql,params){
		return new Promise((resolve,reject) => {
			connection.query(sql,params,(err,rows) => {
				if(err){
					connection.rollback(err=>{
						console.log("Realizando ROLLBACK")
						if(err){
							console.log("No se pudo realizar rollback")
						}
					})
					reject(err)
				} else
					resolve(rows)
			})
		})
	}

	beginTransaction(){
		var me = this
		return new Promise((resolv,reject) => {
			me.connection.getConnection((err,connection)=>{
				if(err)
					reject(err)
				else {
					connection.beginTransaction(err=>{
						connection.release()
						reject(err)
					})
					resolv(connection)
				}
			})
		})
	}
	rollback(connection){
		return new Promise((resolv,reject) => {
			connection.rollback(err=>{
				console.log("Realizando ROLLBACK")
				if(err){
					console.log("Rollback: ",err)
					reject(err)
				} else
					resolv()
			})
		})
	}
	commit(connection){
		return new Promise((resolv,reject) => {
			connection.commit(err=>{
				if(err)
					reject(err)
				else
					resolv()
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
