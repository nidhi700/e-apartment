var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'eapartment',
    port: 3360

    //port : 3360

});

connection.connect(function(err) {
    if(err){
    	throw err;
    }else{
    	console.log("Connected!");	
    }    
});


module.exports=connection;