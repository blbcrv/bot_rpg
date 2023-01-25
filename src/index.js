/** @format */
// console.clear();

const express = require("express")
const Discord = require('discord.js')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");
const client = new Client({
  intents : [
			Discord.GatewayIntentBits.Guilds,
			Discord.GatewayIntentBits.GuildMessages,
			Discord.GatewayIntentBits.MessageContent,
			Discord.GatewayIntentBits.GuildMembers,
  ]
});
client.start(config.token);

