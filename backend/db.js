const mysql = require('mysql');

const db = mysql.createConnection({
  host: '10.10.10.2',
  user: 'filcopor',
  password: 'fifilcoporpo',
  database: 'filcopor', 
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('MySQL connected');
});

module.exports = db;
