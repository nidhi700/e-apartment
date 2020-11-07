var db=require('../dbconnection');
var generator = require('generate-password');
 
var password = generator.generate({
    length: 10,
    numbers: true
});

var item = {
    addFlatMember:function (item,callback) {
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
};

module.exports = item;