var db=require('../dbconnection');

var item = {
    addFlatMember:function (item,callback) {
        console.log("Dont worry Flat Member Added");
        // return db.query('insert into member_details values(?,?,?,?,?)',[item.flat_no,item.bhk],callback);
    },
    getFlatNo:function (callback) {
        return db.query('select Flat_No from flat',callback);
    }
};

module.exports = item;