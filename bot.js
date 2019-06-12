//TODO
// CODE:
// [-] loose coupling
// [-] optimize
// [-] clean
//
// TASKS:
// [-] add ``
// [-] add `stat` command functionalities
//   - consider renaming it to qp since `comp` command already exists
//   - or have `stat` (cumulative), `qp`, `comp`
// [-] add `updates` command functionalities
// [-] add `comp` command functionalities

const AUTH = require('./auth.json');
const Discord = require('discord.js');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const client = new Discord.Client();
const webhook = new Discord.Webhook();
const guild = new Discord.Guild();
const today = new Date();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
})

client.on('message', inputMessage => {
    // ignores messages sent by itself
    if (inputMessage.author == client.user) {
        return;
    }

    if (inputMessage.content.startsWith("ow.")) {
        console.log("[" + today.toLocaleDateString() + " " +
            today.toLocaleTimeString('en-US') + "] " +
            inputMessage.author.tag + ": " +
            inputMessage.content);
        processCommand(inputMessage);
    }
})

 /**
  * Any message starting with "ow." will be passed to this function.
  * This function validates the number of argumetns in the input command, and
  * executes them to helper functions accordingly.
  *
  * @param  {Discord.Message} inputMessage message the user typed
  */
function processCommand(inputMessage) {
    let fullCommand = inputMessage.content.substr(3);
    let splitCommand = fullCommand.split(" ");
    let retVal = new Discord.RichEmbed().setFooter("by Joon#9701");

    const inputCommand = splitCommand[0];
    const inputArgs = splitCommand.slice(1);

    // READ https: //hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d
    switch (inputCommand) {
        case "help":
		    retVal = processCommand_help(splitCommand, retVal);
            break;
	    case "stat":
		    retVal = processCommand_stat(splitCommand, retVal);
			console.log(retVal);
		    break;
        case "updates":
            break;
        case "comp":
		    break;
        default:
            break;
    }
    inputMessage.channel.send(retVal.content);
}


/**
 * processCommand_help - description
 *
 * @param  {type} splitCommand description
 * @param  {type} retVal       description
 * @return {type}              description
 */
function processCommand_help(splitCommand, retVal) {
	retVal.setTitle("List of Commands");
	retVal.setColor("#ffffff");

	// when scaling later, use a for loop to iterate through avaialble
	// commands and add the mto fields.
	retVal.addField("`ow.help`", "gets the list of commands", false);
	retVal.addField("`ow.stat [OPTION]`", "gets the statistics of players", false);
	retVal.addField("`ow.updates [OPTION]`", "gets the list of commands", false);
	retVal.addField("`ow.comp [OPTION]...`", "gets competitive overwatch", false);

	return retVal;
}


/**
 * processCommand_stat - description
 *
 * @param  {type} splitCommand description
 * @param  {type} retVal       description
 * @return {type}              description
 */
function processCommand_stat(splitCommand, retVal) {
	console.log(splitCommand);
	if (splitCommand.length == 1) {
		retVal.content = "Please provide a battletag. If you need help using this command, type `ow.stat help`";
	} else if (splitCommand.length != 2) {
		retVal.content = "`ow.stat` command takes only 1 argument, which should be the Battletag of the player you\'re seaching for.";
	} else {
		const httpClient = new HttpClient(); //create_ovewatch_url_here

	    httpClient.get("http://macrogenusa.com/", function(response) {
   	        retVal.content = response;
		});
	}
	return retVal;
}


/**
 * var HttpClient - description
 *
 * @return {type}  description
 */
var HttpClient = function() {
	this.get = function(inputURL, callbackFunc) {

		let xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			console.log(xmlhttp.readyState);
			console.log(xmlhttp.status);

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log("here");
				callbackFunc(xmlhttp.responseText);
			}
		}

		xmlhttp.open("GET", "http://macrogenusa.com/", false);
		xmlhttp.send();
	}
}


client.login(AUTH.TOKEN);
