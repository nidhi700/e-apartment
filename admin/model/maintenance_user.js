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
        return db.query('insert into maintenance(Amount,Penalty,Status,Login_ID) values(?,?,?,?)',[7000,200,"Paid","201912046@daiict.ac.in"],callback);   
    }
    else
    {
        return db.query('insert into maintenance(Amount,Penalty,Status,Login_ID) values(?,?,?,?)',[7000,0,"Paid","201912046@daiict.ac.in"],callback); 
    }
    }
};

module.exports = item;