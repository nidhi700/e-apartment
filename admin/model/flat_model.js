var db=require('../dbconnection');

var item = {
    viewflat:function(callback) {    
       // console.log("inside model for view flat");
        return db.query("select * from apartment",callback);   
    },
    viewmember:function(callback){
        return db.query("select * from member_details",callback);   
    },
    addFlat:function (item,callback) {
        console.log("Dont worry Flat Added");
        return db.query('insert into flat values(?,?)',[item.flat_no,item.bhk],callback);
    }
};

module.exports = item;