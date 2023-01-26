const mysql = require('mysql');
const Database =  new mysql.createConnection({
  host: "88.208.226.189",
  port: "3306",
  user:"bot",
  password:"bot",
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
