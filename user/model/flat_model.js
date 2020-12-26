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
    getFlat:function(item,callback)
    {
        console.log("Inside GetFlat");
        return db.query("select * from flat where Flat_No=?",[item],callback);
    },
    
    updateFlat:function(item,callback){
        console.log("In Update Model...!!!");
        // console.log(item.bhk+"   "+item.flat_no);
    	return db.query('update flat SET BHK=? WHERE Flat_No=?',[item.bhk,item.flat_no],callback);
    }    
};

module.exports = item;