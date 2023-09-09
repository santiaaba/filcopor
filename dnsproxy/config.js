module.exports = {
	ips:[process.env.LISTEN_IPS],
	db:{
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		connectionLimit: 2
   },
	recursive:{
		dns1: process.env.RDNS1,
		dns2: process.env. RDNS2
	},
	cautive: process.env.CAUTIVE,
	cautive_loggin: process.env.LOGIN,
	lmdb:{
		name: "my-db"
	}
}
