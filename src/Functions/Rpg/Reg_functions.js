const Classe = require("../../Structures/Rpg/Classe")
const Character = require("../../Structures/Rpg/Character")
const config = require("../../Data/config.json")
const Inventaire = require("../../Structures/Rpg/Inventaire")
const Arme = require("../../Structures/Rpg/Arme")

function registerPlayer(nomClasse, db, interaction) {
    let initClasse = `select nom, attaque, defense from classes where nom = '${nomClasse}'`

    db.query(initClasse, (e, r) => {
        if (e) return console.log(e)
        let res = r[0]
        let guerrierClasse = new Classe(res.nom, res.attaque, res.defense)
        let newPlayer = new Character(config.playerName, guerrierClasse, guerrierClasse.attaque, guerrierClasse.defense)
        let insertPlayer = `insert into players (discord, nom, vie, attaque, defense, classe, inventaire) values ("${interaction.user.id}", "${newPlayer.nom}", ${newPlayer.vie}, ${newPlayer.attaque}, ${newPlayer.defense}, '${JSON.stringify(newPlayer.classe)}', '${JSON.stringify(fillPlayerInventoryAtStart(newPlayer.classe, db))}')`

        db.query(insertPlayer)

        interaction.channel.send("Création de personnage réalisée avec succès !")
    })
}

function fillPlayerInventoryAtStart(classe, db) {
    let inventaire = new Inventaire();

    switch (classe.nom) {
        case 'Guerrier':
            reqArmeBaseDonnee(db, "Epee", inventaire)

        case 'Archer':
            reqArmeBaseDonnee(db, "Arc", inventaire)

        break
    }
    return inventaire.contenance;
}

/**
 * 
 * @param {*} db 
 * @param {*} nom 
 * @param {Inventaire} inventaire 
 */
function reqArmeBaseDonnee(db, nom, inventaire) {
    
    let getArme = `select nom, attaque, defense from armes where nom = '${nom}'`

   db.query(getArme,(e, r) => {
        if (e) return console.log(e)
        let arme = r[0]
        inventaire.addContenance(arme)
    })
    

}

module.exports = { registerPlayer }