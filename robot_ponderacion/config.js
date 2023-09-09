module.exports = {
	db:{
		user: process.env.DBUSER,
		pass: process.env.DBPASS,
		host: process.env.DBHOST,
		database: process.env.DBNAME,
		connectionLimit: 2
   },
	threshold:{
		max: 1000,
		middle: 100
	}
}
