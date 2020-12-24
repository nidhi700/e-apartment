var db=require('../dbconnection');

var item = {
    viewcomplaints:function(callback) {    
        return db.query("select * from complaints",callback);   
    },
    addcomplaints:function (item,callback) {
    	var datetime = new Date();
    	console.log(datetime);
        return db.query('insert into complaints(complaint_name,Date) values(?,?)',[item.comp1,datetime.toISOString().slice(0,10)],callback);
    },
    updatecomplaints:function (item,callback) {
    	var datetime = new Date();
    	//console.log(datetime);
        return db.query('update complaints set complaint_name=?,Date=? where C_id=?',[item.comp2,datetime.toISOString().slice(0,10),item.compid],callback);
    },
    getComp:function(id,callback)
    {
        return db.query("select * from complaints where C_id=?",[id],callback);
    }
};

module.exports = item;