class Inventaire {
    constructor(){
        
        this.contenance = [];
        this.taille = this.contenance.length;
    }


   addContenance(item){
        this.contenance.push(item)
    }
    

}

module.exports = Inventaire