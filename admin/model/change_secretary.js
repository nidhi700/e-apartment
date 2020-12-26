var db=require('../dbconnection');

var item = {
    getLogin:function (callback) {
        console.log("In Secretary Dropdown");
        return db.query('select Login_ID from member where Role="Owner" and isSecretory=0',callback);
    },
    updateSecretory:function (item,callback) {
        console.log("Secretory Updated....");
        db.query('UPDATE member SET isSecretory=0');
        return db.query('UPDATE member SET isSecretory=1 where Login_ID=?',[item.loginid],callback);
    },
};

module.exports = item;