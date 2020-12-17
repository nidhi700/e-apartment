var express = require('express');
var router = express.Router();
var signin = require("../model/signin_model");
var flat = require("../model/flat_model");
var flatmember = require("../model/flatmember_model");
var apt = require("../model/apartment_model");
var festival = require("../model/festival_model");
var service_cat = require("../model/service_cat_model");
var service_detail = require("../model/service_detail_model");
var comp = require("../model/complaints_model");

//-----------------------------------User Side---------------------------------------------------
var com = require("../model/complaints_model_user");
var fest_user = require("../model/festival_model_user");
//-----------------------------------/User Side---------------------------------------------------

var db=require('../dbconnection');
var obj={};
var da="";


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
 // res.json(req.body);
});
router.get('/reminder',function(req, res, next) {
  res.render('reminder_notification');
 // res.json(req.body);
});
router.get("/", function(req, res, next) {
      res.render('Login');
     // res.json(req.body);
  });
  router.get('/addflat', function(req, res, next) {
    res.render('addFlat');
   // res.json(req.body);
  });
  
  router.get('/addmember',(req, res, next) => {
    // console.log("in get flat number");
    flatmember.getFlatNo((err, row) => {
        if (err) {
            res.json(err);
            res.render('addMember',{data:row});
        }
        else {
            res.render('addMember',{data:row});
        }
    });
});
  
  router.get('/viewflatmembers', function(req, res, next) {
    flatmember.viewmember(function(err,rows){
      console.log("inside index");
        if(err){
          res.json(err);
          res.render('view_flat_members',{data:rows});
        }
        else{
           // da=JSON.stringify(rows);
            res.render('view_flat_members',{data:rows});
        }
    });
  });
 
 router.get('/viewflatdetails', function(req, res, next) {
    //   res.render('Venue');
       flat.viewflat(function(err,rows){
          console.log("inside index");
            if(err){
              res.json(err);
              res.render('view_flat_details',{data:rows});
            }
            else{
               // da=JSON.stringify(rows);
                res.render('view_flat_details',{data:rows});
            }
        });
      });


      router.get("/edit_member/:id?", (req, res, next) => {
        //console.log(req.params.id);
        //res.render('EditMember');
        flatmember.getmember(req.params.id,function(err,rows){
         da=rows;
         
          if(err){
            //res.render('EditMember',{data:rows});
              res.json(err);
          }
          else{ 
            obj = {
              data: rows
            };            
        

      flatmember.getFlatNo(function(err,rows1){
        if(err){
            res.json(err);
        }
        else{
          data1=rows1;
          var obj={};
          obj.data=rows;
          obj.data1=data1;
            res.render('EditMember',obj);
          }
    });
  }
  });

      });


 router.get('/apartment_detail', function(req, res, next) {
    //   res.render('Venue');
       apt.viewapartment(function(err,rows){
          //console.log("inside index");
            if(err){
              res.json(err);
              res.render('apartment_detail',{data:rows});
            }
            else{
               // da=JSON.stringify(rows);
                res.render('apartment_detail',{data:rows});
            }
        });
      });

  router.get('/deleteflatmember/:id?', function(req, res, next) {
    // console.log(req.params.id);
    flatmember.deleteMember(req.params.id, (err,rows) => {
      console.log("inside delete");
        if(err){
          res.json(err);
          alert("hi");
          res.redirect('/viewflatmembers');
        }
        else{
           // da=JSON.stringify(rows);
            res.redirect('/viewflatmembers');
        }
    });
  });
  
  router.get('/deletefestival/:id?', function(req, res, next) {
    // console.log(req.params.id);
    festival.deleteFestival(req.params.id, (err,rows) => {
      console.log("inside delete");
        if(err){
          res.json(err);
          res.redirect('/festivalDetails');
        }
        else{
           // da=JSON.stringify(rows);
            res.redirect('/festivalDetails');
        }
    });
  });

//Edited 
  router.get('/updateflatdetail', function(req, res, next) {
    console.log("abc "+req.body.fno);
    const fno = req.body.fno;    
    flat.updateFlat1(function(fno,err,rows){
        if(err){
          res.json(err);   
          res.render('updateFlat',{data:rows});       
        }
        else{
          res.render('updateFlat',{data:rows});       
        }
    })
    //res.render('updateFlat',{fno});
   // res.json(req.body);
  });
      
  router.get('/addApartment', function(req, res, next) {
    res.render('addApartment');
   // res.json(req.body);
  });
  router.get('/addFestival', function(req, res, next) {
    res.render('addFestival');
   // res.json(req.body);
  });
  
  router.get('/viewcomplaints', function(req, res, next) {
    res.render('viewComplaints');
   // res.json(req.body);
  });


  router.get('/festivalDetails', function(req, res, next) {
    festival.getAllFestival(function(err,rows){
      console.log("inside index");
        if(err){
          res.json(err);
          res.render('festival',{data:rows});
        }
        else{
           // da=JSON.stringify(rows);
           console.log(rows);
            res.render('festival',{data:rows});
        }
    });
  });
  
  router.get('/addServiceCat', function(req, res, next) {
    res.render('addServiceCat');
   // res.json(req.body);
  });

  router.get('/servicecat', function(req, res, next) {
    //   res.render('Venue');
    service_cat.viewcat(function(err,rows){
          console.log("inside Service");
            if(err){
              res.json(err);
              res.render('view_service_cat',{data:rows});
            }
            else{
               // da=JSON.stringify(rows);
                res.render('view_service_cat',{data:rows});
            }
        });
      });
  
      
    router.get("/edit_serviceCat/:id?", (req, res, next) => {
        //console.log(req.params.id)
        //res.render('EditMember');
        service_cat.getServiceCat(req.params.id,function(err,rows){
         da=rows;
         
          if(err){
            
              res.json(err);
              //res.render('EditServiceCat');            
          }
          else{ 
            obj = {
              data: rows
            }; 
            res.render('EditServiceCat',obj);
          }
          
  });
  //return res.redirect('/index');
      });

      router.get('/service_detail', function(req, res, next) {
        //   res.render('Venue');
        service_detail.viewservicedetails(function(err,rows){
              console.log("inside Service");
                if(err){
                  res.json(err);
                  res.render('view_service_details',{data:rows});
                }
                else{
                   // da=JSON.stringify(rows);
                    res.render('view_service_details',{data:rows});
                }
            });
          });


       
  router.get('/addServicedetails',(req, res, next) => {
    service_cat.viewcat((err, row) => {
        if (err) {
            res.json(err);
            res.render('addServiceDetail',{data:row});
        }
        else {
            res.render('addServiceDetail',{data:row});
        }
    });
});


router.get("/editServiceCat/:id?", (req, res, next) => {  
  service_detail.updateServicedetails(req.params.id,function(err,rows){
   da=rows;
   
    if(err){
        res.json(err);
    }
    else{ 
      obj = {
        data: rows
      };            

service_detail.getCattNo(function(err,rows1){
  if(err){
      res.json(err);
  }
  else{
    data1=rows1;
    var obj={};
    obj.data=rows;
    obj.data1=data1;
      res.render('EditServiceDetails',obj);
    }
});
}
});

});



 router.get('/view_complaints', function(req, res, next) {
    comp.viewcomplaints(function(err,rows){
        if(err){
          res.json(err);
          res.render('viewComplaints',{data:rows});
        }
        else{
            res.render('viewComplaints',{data:rows});
        }
    });
  });

  router.get('/sidebar', function(req, res, next) {
    res.render('sidebar');
   // res.json(req.body);
  });





//------------------------------------------------User Area----------------------------------------






 router.get('/viewcomp', function(req, res, next) {
    com.viewcomplaints(function(err,rows){
        if(err){
          res.json(err);
          res.render('view_complaint_User',{data:rows});
        }
        else{
            res.render('view_complaint_User',{data:rows});
        }
    });
  });


router.get('/addcom', function(req, res, next) {
    res.render('add_complaints_user');
  });

router.get("/edit_comp/:id?", (req, res, next) => {
  com.getComp(req.params.id,function(err,rows){
          
    if(err){
      res.json(err);
    }
    else{
      obj = {
        data: rows
      }; 
      res.render('EditComplaint',obj);
    }
  });
});


 router.get('/viewFest', function(req, res, next) {
    fest_user.viewfestival(function(err,rows){
        if(err){
          res.json(err);
          res.render('view_festival_User',{data:rows});
        }
        else{
            res.render('view_festival_User',{data:rows});
        }
    });
  });



router.get('/service_detail_user', function(req, res, next) {
  //   res.render('Venue');
  service_detail_user.viewservicedetails(function(err,rows){
        console.log("inside Service");
          if(err){
            res.json(err);
            res.render('view_service_user',{data:rows});
          }
          else{
             // da=JSON.stringify(rows);
              res.render('view_service_user',{data:rows});
          }
      });
    });


router.get('/index_user', function(req, res, next) {
  res.render('index_user');
});

  router.get('/sidebar_user', function(req, res, next) {
    res.render('sidebar_user');
  });


module.exports = router;
