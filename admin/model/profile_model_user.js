var db=require('../dbconnection');

var item = {
    viewprofile:function(callback) {    
        console.log("inside model for view flat");
       var flatno="honeyshah@gmail.com";
        var da=db.query("select * from member",callback);
        
        console.log("\n\nfdgfcy : "+da[0]);
    }
};

module.exports = item;