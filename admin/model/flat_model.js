var db=require('../dbconnection');

var item = {
    viewflat:function(callback) {    
       // console.log("inside model for view flat");
        return db.query("select * from apartment",callback);   
    },
    addFlat:function (item,callback) {
        console.log("Dont worry Flat Added");
        return db.query('insert into flat values(?,?)',[item.flat_no,item.bhk],callback);
    }
};

module.exports = item;