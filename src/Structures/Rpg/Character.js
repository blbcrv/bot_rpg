/** @format */

class Character {
    constructor(pfNom, pfClasse, att, def) {

        this.nom = pfNom;
        this.vie = 100;
        this.attaque = 10 + att;
        this.defense = 10 + def;
        this.classe = pfClasse
        this.armeEnMain = null;
        this.specialite = null;
        this.inventaire = null;
        this.objectifs = null;
    }


}

module.exports = Character;
