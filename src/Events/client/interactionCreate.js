/** @format */
const Event = require("../../Structures/Event.js");
const Discord = require('discord.js');
const request = require('request');
const Character = require("../../Structures/Rpg/Character.js");
const Classe = require("../../Structures/Rpg/Classe.js");
const config = require('../../Data/game_data.json');
const { registerPlayer } = require("../../Functions/Rpg/Reg_functions.js");

module.exports = new Event("interactionCreate", async (client, interaction) => {

	if (interaction.values[0] === "guerrier") {

		registerPlayer(interaction.values[0], client.db, interaction)
	}
	else if(interaction.values[0] === "archer"){

		registerPlayer(interaction.values[0], client.db, interaction)

	}



});


