const Classe = require("../../Structures/Rpg/Classe")
const Character = require("../../Structures/Rpg/Character")
const config = require("../../Data/game_data.json")
const Inventaire = require("../../Structures/Rpg/Inventaire")
const Arme = require("../../Structures/Rpg/Arme")
const { json } = require("express")

function registerPlayer(nomClasse, db, interaction) {
    let initClasse = `select nom, attaque, defense from classes where nom = '${nomClasse}'`

    db.query(initClasse, (e, r) => {
        if (e) return console.log(e)
        let res = r[0]
        let classe = new Classe(res.nom, res.attaque, res.defense)
        let newPlayer = new Character(config.playerName, classe, classe.attaque, classe.defense)

        let insertPlayer = `insert into players (discord, nom, vie, attaque, defense, classe) values ("${interaction.user.id}", "${interaction.user.username}", ${newPlayer.vie}, ${newPlayer.attaque}, ${newPlayer.defense}, '${JSON.stringify(newPlayer.classe)}')`

        db.query(insertPlayer, (e) => { if (e) return console.log(e) })
        fillPlayerInventoryAtStart(classe, db, interaction)
        console.log(getPlayerInvData(interaction, db))

        interaction.channel.send("Création de personnage réalisée avec succès !")
    })
}

/**
 * 
 * @param {Classe} classe 
 * @param {Database} db 
 * @param {import("discord.js").Interaction} interaction 
 */
function fillPlayerInventoryAtStart(classe, db, interaction) {
    let inventaire = new Inventaire();

    switch (classe.nom) {
        case 'Guerrier':

            inventaire.addContenance(new Arme("Epee", 50, 10))

        case 'Archer':

            inventaire.addContenance(new Arme("Arc", 50, 10))

            break

    }

    let convertData = JSON.stringify(inventaire.contenance)
    let insertInv = `insert into Inventaires values ('${interaction.user.id}', '${convertData}') `

    db.query(insertInv, (e) => { if (e) console.log(e) })

}

/**
 *  
 * @param {import("discord.js").Interaction} interaction
 */
function getPlayerInvData (interaction, db) {
    let getInventory = `select contenu from Inventaires where discord = "${interaction.user.id}"`
    let output;

    db.query(getInventory, (e,r) =>{
        if (e) console.log(e)

        getPlayerInventory(r[0])
    })

    
    
}
function getPlayerInventory(data){
    let parsedData =JSON.parse(data.contenu)[0]
    console.log(parsedData)
}


module.exports = { registerPlayer }