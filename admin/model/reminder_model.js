var db=require('../dbconnection');

var item = {
    getAllMail:function(callback) {    
        return db.query("select * from member",callback);   
    },
};

module.exports = item;