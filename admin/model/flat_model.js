var db=require('../dbconnection');

var item = {
    viewflat:function(callback) {    
       //console.log("inside model for view flat");
        return db.query("select * from flat",callback);   
    },
    addFlat:function (item,callback) {
        //console.log("Dont worry Flat Added");
        return db.query('insert into flat values(?,?)',[item.flat_no,item.bhk],callback);
    },
    //edited
    updateFlat1:function(id,item,callback){
    	return db.query('update table_name SET BHK=? WHERE Flat_No=?',[item.bhk,id],callback);
    }    
};

module.exports = item;