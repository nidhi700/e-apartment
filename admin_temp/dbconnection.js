var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'eapartment'
});

connection.connect(function(err) {
    if(err) {
    	throw err;
    }
    console.log("Connected!");
});


module.exports=connection;