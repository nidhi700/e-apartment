var db=require('../dbconnection');

var item = {
    viewcat:function(callback) {    
        return db.query("select * from service_category",callback);   
    },
    addcat:function (item,callback) {        
        return db.query('insert into service_category(Name) values(?)',[item.category_name],callback);
    },
    updateServiceCategory:function (item,callback) {
        console.log("Category Update"+item.servicecatid+" "+item.category_name);
        return db.query('UPDATE service_category SET Name=? where Service_ID=?',[item.category_name,item.servicecatid],callback);
    },
    getServiceCat:function(id,callback)
    {
        console.log("select category"+id);
        return db.query("select * from service_category where Service_ID=?",[id],callback);
    }
    
};

module.exports = item;