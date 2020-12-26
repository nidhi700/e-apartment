var db=require('../dbconnection');

var item = {
    addFestival:function(item, callback) {
        console.log("Model = " + item.festivalname);
        return db.query('insert into festival(name) values(?)', [item.festival], callback);
    }, 
    getAllFestival:function(callback)
    {
        return db.query('select * from festival', callback);

    },
    deleteFestival:function(item,callback)
    {
        return db.query('DELETE FROM festival where Festival_ID=?',[item],callback);
    }
};

module.exports = item;