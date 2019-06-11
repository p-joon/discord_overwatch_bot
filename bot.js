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

    if (inputMessage.content.startsWith(">")) {
		processCommand(inputMessage);
	}
})

/**
 * Any message starting with the '>' character will be passed to this function.
 * This function validates the input command, and executes it ONLY IF the
 * command is valid.
 */
function processCommand(inputMessage) {
    let fullCommand  = inputMessage.content.substr(1);
	let splitCommand = fullCommand.split(" ");
	let retVal = "";

	const inputCommand = splitCommand[0];
	const inputArgs    = splitCommand.slice(1);

	// READ https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d
	switch(inputCommand) {
		case "help":
          retVal = "`!help` detected";
		  break;
		default:
		  break;
	}

    console.log("==========================")
	console.log("COMMAND : " + inputCommand);
	console.log("ARGS    : " + inputArgs);
	console.log("RETURN  : " + retVal);
}

client.login(AUTH.TOKEN);
