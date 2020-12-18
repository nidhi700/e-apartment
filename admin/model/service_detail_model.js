var db=require('../dbconnection');

var item = {
    viewservicedetails:function(callback) {    
        return db.query("select * from service_details as sd join service_category as sc on sd.Service_ID=sc.Service_ID",callback);   
    },
    addservicedetails:function (item,callback) {     
        console.log(item.bill);
        
        db.query("select Society_Fund from society", function (err, result) {
            if (err) throw err;

            a= result[0].Society_Fund;
            a-=item.expense;
            db.query("update society set Society_Fund=? ",[a]);
        });
        

         return db.query('insert into service_details(Service_ID, Date, Expense, Description, Bill) values(?,?,?,?,?)',[item.Service_ID,item.servicedate,item.expense,item.description,item.bill],callback);
    },
    updateServicedetails:function (item,callback) {
        //console.log("Category Update"+item.servicecatid+" "+item.category_name);
        db.query("select Expense from service_details where SD_ID=?",[item.SD_ID], function (err, result) {
            if (err) throw err;
            var servicecharge=result[0].expense;
            
            db.query("select Society_Fund from society", function (err, result) {
                a= result[0].Society_Fund;
                if(servicecharge>item.expense)
                {
                    a+=(servicecharge-item.expense);
                }
                else
                {
                    a-=(item.expense-servicecharge);
                }
                db.query("update society set Society_Fund=? ",[a]);
            });
        });
        
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