require('dotenv').config();

let bot = require('./app/bot');
let db = require('./app/database');

main();

async function main() {
	try {
		bot = await bot;
		await bot.user.setActivity('db connecting...');
		db = await db;
		global.db = db;
		await bot.user.setActivity('connected!');
		tick();
	}
	catch(err) {
		console.error('caught:', err);
	}
}

async function tick() {
	const online = (await db.query('SELECT COUNT(*) AS count FROM accounts where loggedin = 2'))[0];
	// const accounts = db.query('SELECT COUNT(*) AS count FROM accounts');
	// const characters = db.query('SELECT COUNT(*) AS count FROM characters');
	await bot.user.setActivity(`with ${online.count} user${(online.count > 1 ? 's' : '')} online`);

	setTimeout(tick, 1000 * 30);
}

process.on('uncaughtException', err => {
	console.error(err);
});
