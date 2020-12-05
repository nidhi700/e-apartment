var db=require('../dbconnection');

var item = {
    viewapartment:function(callback) {    
       // console.log("inside model for view flat");
        return db.query("select * from apartment",callback);   
    },
    addApartment:function (item,callback) {
        //console.log("Dont worry Flat Added");
        return db.query('insert into apartment values(?,?,?,?,?)',[item.apt_name,item.lift_cnt,item.floor_cnt,item.flat_cnt,item.camera_cnt],callback);
    }
};

module.exports = item;