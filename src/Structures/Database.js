const mysql = require('mysql');
const Database =  new mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"",
  database: "rpg"
})

Database.connect(function(err) {
  if(err){
    throw(err)
  }
  else{
    console.log('db OK !')
  }
  
})

module.exports = Database;
