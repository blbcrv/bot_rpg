/** @format */
const Command = require("../../Structures/Command.js");
const Discord = require('discord.js');
const config = require('../../Data/game_data.json')


module.exports = new Command({
    name: "test",
    description: "test",
    utilisation: "<prefix>test",
    argument: "null",
    async run(message, args, client) {
        const db = client.db

        let getPlayer = `select * from players where discord = ${message.author.id} `

        db.query(getPlayer, async (e, r) => {
            if (e) return console.log(e)
            if (r.length != 0) return message.reply("Vous avez déjà créé votre personnage !")

            console.log(message.author);
            message.channel.send("Choisir un nom de personnage : ")
                .then(

                    message.channel.awaitMessages({ max: 2, time: 30000 })
                        .then(async collected => {

                            config.playerName = collected.last().content

                            const row = new Discord.ActionRowBuilder()
                                .addComponents(

                                    new Discord.StringSelectMenuBuilder()
                                        .setCustomId('creationPersonnage')
                                        .setPlaceholder('Choissez une classe :')
                                        .addOptions(
                                            {
                                                label: 'Guerrier',
                                                description: 'ATQ : +50, DEF : +20',
                                                value: 'guerrier',
                                            },
                                            {
                                                label: 'Archer',
                                                description: 'ATQ : +50, DEF : +20',
                                                value: 'archer',
                                            },
                                        ),
                                );

                            await message.reply({ components: [row] });
                        })
                )






        })


    }
});