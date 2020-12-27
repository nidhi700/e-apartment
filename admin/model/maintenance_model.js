var db=require('../dbconnection');

var item = {
    viewmaintenance:function(callback) {    
       //console.log("inside model for view flat");
        return db.query("select * from maintenance",callback);   
    },
    getPendingEmail:function(callback){
        return db.query("select member_id from maintenance where status='pending'",callback);   

    },
    addmaintenance:function(item,callback)
    {
        
        console.log('inside add member');
       
       for(var i=0;i<item.length;i++)
        {
           console.log(item[i]);
             db.query('insert into maintenance(Amount,Penalty,Status,Login_ID) values(?,?,?,?)',[7000,0,'pending',item[i].Login_ID]);
       }
       return db.query('select * from member',callback);
    }
};

module.exports = item;