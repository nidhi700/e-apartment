var db=require('../dbconnection');

var item = {
    viewcomplaints:function(callback) {    
        return db.query("select * from complaints",callback);   
    },
    addcomplaints:function (item,callback) {
        return db.query('insert into complaints(complaint_name) values(?)',[item.comp1],callback);
    }      
};

module.exports = item;