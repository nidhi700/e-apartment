var db=require('../dbconnection');

var item = {
    viewservicedetails:function(callback) {    
        return db.query("select * from service_details as sd join service_category as sc on sd.Service_ID=sc.Service_ID",callback);   
    },
    addservicedetails:function (item,callback) {     
        console.log(   item.bill);
        return db.query('insert into service_details(Service_ID, Date, Expense, Description, Bill) values(?,?,?,?,?)',[item.Service_ID,item.servicedate,item.expense,item.description,item.bill],callback);
    },
    updateServicedetails:function (item,callback) {
        //console.log("Category Update"+item.servicecatid+" "+item.category_name);
        return db.query('UPDATE service_details SET Service_ID=?,Date=?,Expense=?,Description=?,Bill=? where SD_ID=?',[item.Service_ID,item.servicedate,item.expense,item.description,item.bill,item.SD_ID],callback);
    },
    getServiceDetails:function(id,callback)
    {
        console.log("select category"+id);
        return db.query("select * from service_details where SD_ID=?",[id],callback);
    },
    getCattNo:function (callback) {
        
        return db.query('select * from service_category',callback);
    }
};

module.exports = item;