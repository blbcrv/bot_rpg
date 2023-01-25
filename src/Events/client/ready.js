/** @format */
const Event = require("../../Structures/Event.js");
const Discord = require('discord.js');
const request = require('request')

module.exports = new Event("ready", async (client) => {
	const db = client.db;
	console.log("Bot OK !");


});

