var db=require('../dbconnection');

var item = {
    isauth1(item, callback) {
        return db.query('select * from user where name = ? and  password = ? ', [item.username, item.password], callback);
    },
   
};

module.exports = item;