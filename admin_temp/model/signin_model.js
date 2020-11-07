var db=require('../dbconnection');

var item = {
    isauth1:function(item, callback) {
        
        console.log("inside model");
        return db.query('select * from login where Login_ID = ? and  Password = ? ', [item.email, item.password], callback);
    }
};

module.exports = item;