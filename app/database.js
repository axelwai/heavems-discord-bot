const { promisify } = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection(process.env.DB_URL);

module.exports = new Promise(start);

function start(resolve, reject) {
	const query = connection.query;
	connection.connect(onDbConnected);
	connection.query = promisify(query);

	function onDbConnected(err) {
		if(err) {
			reject(err);
		}
		resolve(connection);
	}
}
