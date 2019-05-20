const AUTH = require('./auth.json');
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
	console.log("Connected as " + client.user.tag);
})

client.on('message', inputMessage => {
    // ignores messages sent by itself
	if (inputMessage.author == client.user) {
		return;
	}

    if (inputMessage.content.startswith(">")) {
		processCommand(inputMessage);
	}
})

/**
 * Any message starting with the '>' character will be passed to this function.
 * This function validates the input command, and executes it ONLY IF the
 * command is valid.
 */
function processCommand(inputMessage) {
    let fullCommand = inputMessage.content.substr(1);
	let splitCommnd = fullCommand.split(" ");
}

client.login(AUTH.TOKEN);
