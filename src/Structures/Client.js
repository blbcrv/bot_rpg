/** @format */
const Discord = require("discord.js");
const Command = require("./Command.js");
const config = require("../Data/config.json");

const fs = require("fs");
const mysql = require('mysql')
const Database = require("./Database");

class Client extends Discord.Client {
	constructor(intents) {
		super(intents);
		/**
		 * @type {Discord.Collection<string, Command>}
		 * @type {string} 
		 * @type {mysql.Connection}
		 */
		this.commands = new Discord.Collection();
		this.prefix = config.prefix;
		this.db = Database;		
	}

	start(token) {

		fs.readdirSync("./src/Commands")
			.filter(dirJs => dirJs)
			.forEach(dirJs => {
				fs.readdirSync(`./src/Commands/${dirJs}/`)
					.filter(fileJs => fileJs.endsWith(".js"))
					.forEach(fileJs => {
						const command = require(`../Commands/${dirJs}/${fileJs}`);
						console.log(`Commande ${command.name} chargée !`);
						this.commands.set(command.name, command);
					})
			});

		fs.readdirSync("./src/Events")
			.filter(dirJs => dirJs)
			.forEach(dirJs => {
				fs.readdirSync(`./src/Events/${dirJs}`)
					.filter(fileJs => fileJs.endsWith(".js"))
					.forEach(fileJs => {
						const event = require(`../Events/${dirJs}/${fileJs}`);
						console.log(`Event ${event.event} chargé !`);
						this.on(event.event, event.run.bind(null, this));
					})
			});

		this.login(token);
	}
}

module.exports = Client;
