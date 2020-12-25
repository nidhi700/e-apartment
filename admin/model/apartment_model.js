var db=require('../dbconnection');

var item = {
    viewapartment:function(callback) {    
       // console.log("inside model for view flat");
        return db.query("select * from apartment",callback);   
    },
    addApartment:function (item,callback) {
        //console.log("Dont worry Flat Added");
        return db.query('insert into apartment values(?,?,?,?,?)',[item.apt_name,item.lift_cnt,item.floor_cnt,item.flat_cnt,item.camera_cnt],callback);
    },
    deleteApartment:function (item,callback) {
        console.log("Fiker not Delete..!!!");
        return db.query('DELETE FROM apartment where Apt_Name=?',[item],callback);
    },
    getApartment:function(item,callback)
    {
        console.log("Inside get Appartment");
        return db.query("select * from apartment where Apt_Name=?",[item],callback);
    },
    updateApartment:function (item,callback) {
        console.log("Flat Member Update");
        return db.query('UPDATE apartment SET Lift_Count=?,Floor_Count=?,Flat_Count=?,Camera_Count=? where Apt_Name=?',[item.lift_cnt,item.floor_cnt,item.flat_cnt,item.camera_cnt,item.apt_name],callback);
    },
};

module.exports = item;