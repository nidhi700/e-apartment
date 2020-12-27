var db=require('../dbconnection');

var item = {
    viewamount:function(callback) {    
        //console.log("inside model for view flat"+id);
        return db.query("select * from society",callback);
    }
};

module.exports = item;