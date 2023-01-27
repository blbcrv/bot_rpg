/** @format */
const Event = require("../../Structures/Event.js");
const { registerPlayer } = require("../../Functions/Rpg/Reg_functions.js");

module.exports = new Event("interactionCreate", async (client, interaction) => {

	if (interaction.values[0] === "guerrier") {

		registerPlayer(interaction.values[0], client.db, interaction)
	}
	else if(interaction.values[0] === "archer"){
		
		registerPlayer(interaction.values[0], client.db, interaction)

	}



});


