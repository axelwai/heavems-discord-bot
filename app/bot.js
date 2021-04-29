const Discord = require('discord.js');

module.exports = new Promise(start);

function start(resolve, reject) {
	const bot = new Discord.Client();

	bot.on('ready', onClientReady);
	bot.login(process.env.BOT_TOKEN);

	// client events
	
	function onClientReady() {
		console.log('I am ready!');
		resolve(bot);
	}
}
