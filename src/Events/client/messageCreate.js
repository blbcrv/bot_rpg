/** @format */
const Discord = require('discord.js')
const Event = require("../../Structures/Event");
const { prefix } = require('../../Data/config.json')


module.exports = new Event("messageCreate", (client, message) => {
	const db = client.db

	if (!message.content.startsWith(prefix) && !message.author.bot) {
		let member = `SELECT * FROM members WHERE discord = '${message.author.id}'`;
		let expValueAdd = Math.floor(Math.random() * 200);
		let username = message.author.username
		let id = message.author.id
		let first_xp = 200
		let first_lvl = 1

		db.query(member, (e, r) => {
			if (e) {
				let insert = `insert into members (discord, exp, lvl) values (${id}, 0, 1)`

				db.query(insert)
			}

			try {
				let memberExp = r[0].exp
				let memberLvl = r[0].lvl
				let max_xp = memberLvl * first_xp
				let rank_channel = "842448870037258241"

				memberExp += expValueAdd

				let updateExp = `update members set exp = ${memberExp} where discord = '${id}'`

				db.query(updateExp, (e) => {
					if (e) console.log(e)
				})

				if (memberExp >= max_xp) {
					memberExp = 0
					memberLvl += 1

					let updateLvl = `update members set lvl = ${memberLvl}, exp = ${memberExp} where discord = '${id}'`

					db.query(updateLvl, (e) => {
						if (e) console.log(e)
					})

					let profilEmbed = new Discord.MessageEmbed()
						.setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
						.setDescription(`${message.author.username} est passé au niveau ${memberLvl}`)
						.setColor('BLUE')
						.setThumbnail(`${message.author.avatarURL()}`)


					client.channels.cache.get(`${rank_channel}`).send({ embeds: [profilEmbed] });
				}
			}
			catch (e) {
				console.log(e)

				console.log(message.author.id)
				let insert = `insert into members (discord, exp, lvl) values (${id}, 0, 1)`

				db.query(insert)
			}
		})
	}
	else {

		if (message.author.bot) return;
		const args = message.content.substring(client.prefix.length).split(/ +/);
		const command = client.commands.find(cmd => cmd.name == args[0]);

		try{
			command.run(message, args, client);
		}catch(e){
			message.channel.send("Commande inexistante")
		}
		
	}
})

