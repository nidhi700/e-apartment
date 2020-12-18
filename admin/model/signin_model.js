var db=require('../dbconnection');

var item = {
    isauth1:function(item, callback) {
        
        console.log("inside model");
        return db.query('select * from member where Login_ID = ? and  Password = ? ', [item.email, item.password], callback);
    },
    passchange:function(item,callback)
    {
        console.log('password change');
        console.log(item);
        return db.query('UPDATE member SET password=?,First_Login=? where Login_ID=?',[item.password,1,item.loginid],callback);
    }
};

module.exports = item;