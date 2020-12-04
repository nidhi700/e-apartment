var db=require('../dbconnection');

var item = {
    addFestival:function(item, callback) {
        console.log("Model = " + item.festivalname);
        return db.query('insert into festival(name) values(?)', [item.festival], callback);
    }, 
};

module.exports = item;