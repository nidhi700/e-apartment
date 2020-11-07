var db=require('../dbconnection');

var item = {
    viewflat:function(callback) {    
       // console.log("inside model for view flat");
        return db.query("select * from apartment",callback);   
    },
    viewmember:function(callback){
        return db.query("select * from member_details",callback);   
    },

};

module.exports = item;