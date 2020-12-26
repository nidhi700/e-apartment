var db=require('../dbconnection');

var item = {
    viewcomplaints:function(callback) {    
        return db.query("select * from complaints",callback);   
    }
};

module.exports = item;