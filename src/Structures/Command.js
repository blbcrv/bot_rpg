/** @format */
const Client = require("./Client.js");
const Discord = require("discord.js");
const mysql = require('mysql')

/**
 * @param {Discord.Message | Discord.Interaction} message
 * @param {string[]} args
 * @param {Client} client
 * @param {mysql.Connection} db
 */
function RunFunction(message, args, client, db) {}

class Command {
	/**
	 * @typedef {{name: string, description: string, utilisation: string, argument: string, category: string, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.utilisation = options.utilisation;
		this.argument = options.argument;
		this.run = options.run;
	}
}

module.exports = Command;
