/** @format */
const Command = require("../../Structures/Command.js");
const Discord = require('discord.js');

module.exports = new Command({
    name: "profil",
    description: "Permet de voir son profil joueur",
    utilisation: "<prefix>profil",
    argument: "null",
    async run(message, args, client) {
        const db = client.db

        let getPlayer = `select * from players where discord = '${message.author.id}' `

        db.query(getPlayer, function (e, r) {
            if (e) {
                console.log(e)
            } else {

                //let user = client.users.cache.get(r[0].discord)
                let classe = JSON.parse(r[0].classe)
                let profilEmbed = new Discord.EmbedBuilder()
                    .setAuthor({name: `🥷 ${r[0].nom}`, iconURL: `${message.author.avatarURL()}`})
                    .setDescription(`🗡 Classe : ${classe.nom} \n 
                    ❤️ Vie : ${r[0].vie} \n 
                    🔪 Attaque : ${r[0].attaque} \n 
                    🛡 Défense : ${r[0].defense} \n
                    🎒 Inventaire : ${JSON.parse(r[0].inventaire)[0].nom}`)
                    .setColor(0x0099FF)

                message.channel.send({ embeds: [profilEmbed] })
            }
        })
    }
});
