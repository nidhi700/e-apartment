var db=require('../dbconnection');

var item1 = {
    getAllMail:function (callback) {
        console.log("In All Mail...");
        return db.query('select Login_ID from member',callback);
    }
};

module.exports = item1;