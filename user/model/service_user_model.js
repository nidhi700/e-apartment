var db=require('../dbconnection');

var item = {
    viewservicedetailsuser:function(callback) {    
        return db.query("select * from service_details as sd join service_category as sc on sd.Service_ID=sc.Service_ID",callback);   
    }
};

module.exports = item;