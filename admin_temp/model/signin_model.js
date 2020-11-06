var db=require('../dbconnection');

var item = {
    isauth1:function(item, callback) {
        
        console.log("inside model");
        return db.query('select * from login where Login_ID = ? and  Password = ? ', [item.username, item.password], callback);
    },
    // addFlat:function (item,callback) {
    //     console.log("Dont worry Flat Added");
    //     return db.query('insert into flat values(?,?,?,?)',[item.,item.,item.,item.],callback);
    // }
};

module.exports = item;