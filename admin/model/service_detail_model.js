var db=require('../dbconnection');

var item = {
    viewservicedetails:function(callback) {    
        return db.query("select * from service_details as sd join service_category as sc on sd.Service_ID=sc.Service_ID",callback);   
    },
    addservicedetails:function (item,sampleFile,callback) {     
        console.log(item.bill);
        
        db.query("select Society_Fund from society", function (err, result) {
            if (err) throw err;

            a= result[0].Society_Fund;
            a-=item.expense;
            db.query("update society set Society_Fund=? ",[a]);
        });
        //console.log(sampleFile);
         return db.query('insert into service_details(Service_ID, Date, Expense, Description, Bill) values(?,?,?,?,?)',[item.Service_ID,item.servicedate,item.expense,item.description,'images\\'+sampleFile.name],callback);
    },
    updateServicedetails:function (item,sampleFile,callback) {
      
        db.query("select Expense from service_details where SD_ID=?",[item.sdid], function (err, result) {
            if (err) throw err;

            var servicecharge=result[0].Expense;
            console.log("ser: "+servicecharge);
            db.query("select Society_Fund from society", function (err, result) {
                a= result[0].Society_Fund;
                console.log("a: "+a);
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

        return db.query('update service_details SET Date=?,Expense=?,Description=?,Bill=? where SD_ID=?',[item.servicedate,item.expense,item.description,'images\\'+sampleFile.name,item.sdid],callback);
    },

    getServiceDetails:function(id,callback)
    {
        console.log("select category"+id);
        return db.query("select * from service_details where SD_ID=?",[id],callback);
    },
    getCattNo:function (callback) {        
        return db.query('select Name from service_category',callback);
    }
};

module.exports = item;