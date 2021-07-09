var mysql= require('mysql');
var config=require('./config');
connection = mysql.createConnection(config.database);

connection.connect(function(err) {
  if (err) console.log("Error in connecting database")
  else console.log("Databse connected!");
});
module.exports=connection;