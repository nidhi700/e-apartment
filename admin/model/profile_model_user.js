var db=require('../dbconnection');

var item = {
    viewprofile:function(id,callback) {    
        console.log("inside model for view flat"+id);
        return db.query("select * from member where Login_ID=?",[id],callback);
    },
    updateprofile:function(item,callback){
    	return db.query("UPDATE member SET Name=?,Flat_Members=?,Contact_No=? where Login_ID=?",[item.tenant_name,item.flat_mem,item.contact,item.email],callback);
    }
};

module.exports = item;