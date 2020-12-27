var db=require('../dbconnection');

var item = {
    
    addmaintenance:function (id,callback) {
    	var datetime = new Date();
    	console.log(datetime);
        console.log(id);
        var a;
        db.query("select * from society", function (err, result) {
            if (err) throw err;
            var t;
            var k;
            a = result[0].Maintenance;
            //a-=item.expense;
            if(Number(datetime.toISOString().slice(8,10))>='11'){
                //t=a+20;
                k=result[0].Society_Fund+a;
            }
            else{
                t=a+200;
                k=result[0].Society_Fund+t;
            }          
            
            db.query("update society set Society_Fund=? ",[k]);
            console.log("update");
            //db.query('insert into maintenance(Amount) values(?)',[a]);
            console.log("insert");
            
        });
        //db.query("select * from maintenance order by DESC limit 1");

    if(Number(datetime.toISOString().slice(8,10))>=11)
    {
        console.log("in if id = "+id);
        
        db.query('update maintenance SET Penalty=?,Status=? where Maintenance_ID=?',[200,"Paid",'32']);               
        return db.query("select * from society",callback);
    }
    else
    {
        console.log("in else id = "+id);
        return db.query('update maintenance SET Status=? where Login_ID=?',["Paid",id],callback);
    }
    }
};

module.exports = item;