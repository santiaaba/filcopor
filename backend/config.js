module.exports = {
	port: 2525,
	db:{
		user: process.env.DBUSER,
		pass: process.env.DBPASS,
		host: process.env.DBHOST,
		database: process.env.DBNAME,
		connectionLimit: 5
	}
}
