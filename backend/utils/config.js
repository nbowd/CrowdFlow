// mySQL Database Configuration
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'cs340_bowdenn',
    dateStrings: 'true'  // This allows the date to be in the correct format

});

module.exports.pool = pool;
