var db=require('../dbconnection');

var item = {
    viewfestival:function(callback)
    {
        return db.query('select * from festival_details as fd join festival as fe on fd.Festival_ID=fe.Festival_ID', callback);
    }
};

module.exports = item;