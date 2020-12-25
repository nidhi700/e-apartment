var db=require('../dbconnection');

var item = {
    addFlatMember:function (item,password,callback) {
        console.log("Dont worry Flat Member Added");
        return db.query('insert into member values(?,?,?,?,?,?,?,?,?)',[item.flatno,item.tenant_name,item.flat_mem,item.contact,item.role,item.email,password,0,1],callback);
    },
    getFlatNo:function (callback) {
        console.log("Dont worry Flat num");
        return db.query('select Flat_No from flat',callback);
    },
    deleteMember:function (item,callback) {
        console.log("Fiker not Delete..!!!");
        return db.query('DELETE FROM member where Login_ID=?',[item],callback);
    },
    viewmember:function(callback){
        return db.query("select * from member",callback);
    },
    getmember:function(id,callback)
    {
        return db.query("select * from member where Login_ID=?",[id],callback);
    },
    updateFlatMember:function (item,callback) {
        console.log("Flat Member Update");
        return db.query('UPDATE member SET Flat_No=?,Name=?,Flat_Members=?,Contact_No=?,Role=? where Login_ID=?',[item.flatno,item.tenant_name,item.t_flat_mem,item.t_contact,item.role,item.loginid],callback);
    },
};

module.exports = item;