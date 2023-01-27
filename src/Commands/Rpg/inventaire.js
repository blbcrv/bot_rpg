/** @format */
const Command = require("../../Structures/Command.js");
const Discord = require('discord.js');

module.exports = new Command({
    name: "inv",
    description: "Permet de voir son inventaire",
    utilisation: "<prefix>inventaire",
    argument: "null",
    async run(message, args, client) {
        const db = client.db

        let getPlayer = `select contenu from Inventaires where discord = '${message.author.id}' `

        db.query(getPlayer, function (e, r) {
            if (e) {
                console.log(e)
            } else {

                let profilEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: `🥷 ${message.author.username}`, iconURL: `${message.author.avatarURL()}` })
                    .setTitle(`Inventaire :`)
                    .setColor(0x0099FF)

                for (var i = 0; i < r.length; i++) {
                    let item = JSON.parse(r[i].contenu)[0]
                        profilEmbed.setDescription(`${item.nom}`)
                        
                }

                message.channel.send({ embeds: [profilEmbed] })

            }
        })
    }
});
