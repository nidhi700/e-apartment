var express = require('express');
var router = express.Router();
var db=require('../dbconnection');

var signin = require("../model/signin_model");
var flat = require("../model/flat_model");
var flatmember = require("../model/flatmember_model");
var apt = require("../model/apartment_model");
var festival = require("../model/festival_model");
var service_cat = require("../model/service_cat_model");
var service_detail = require("../model/service_detail_model");

var comp = require("../model/complaints_model");

var demo= require("../model/emailverify");
var reminder = require("../model/reminder_model");
//var path = require('path');


var Secretary = require("../model/change_secretary");

//-----------------------------------User Side---------------------------------------------------
var com = require("../model/complaints_model_user");
var fest_user = require("../model/festival_model_user");
var pro_user = require("../model/profile_model_user");
var maintenance=require("../model/maintenance_model");
var pro_admin = require("../model/profile_model_admin");
var fund = require("../model/Fund_User");
var maintenance1 = require("../model/maintenance_user");
//-----------------------------------/User Side---------------------------------------------------

var db=require('../dbconnection');
var obj={};
var da="";


/* GET home page. */
router.get('/index', function(req, res, next) {
  Secretary.getLogin((err, row) => {
    if (err) {
        res.json(err);
        res.render('index',{data:row});
    }
    else {
        res.render('index',{data:row});
    }
});
});


router.get("/reminder",function(req, res, next) {
  let ts = Date.now();
  let date = new Date(ts);
            if(date.getDate()>=1 && date.getDate()<10)
            {
            maintenance.getPendingEmail(function (err, row) {

                if (err) {
                    console.log('Error');
                }
                else
                {
                    var numrows = row.length;
                    if (numrows == 0) {
                        console.log('not');
                    }
                    else
                    {
                        for (let i=0;i<row.length;i++) { 
                        
                        const to = row[i].Login_ID;
                        console.log(to);
                        NODE_TLS_REJECT_UNAUTHORIZED='0'
                        const subject = 'Reminder for Maintenance'
                        const message = '<h3> Your Maintenance is not paid yet...After 10th you will be !!!</h3>'
                
                       const mailObj = {to,subject,message}
                        demo.sendMail(mailObj)
                        }
                    }
                }        
            });
            }
            else if(date.getDate()>=26)
            {

              maintenance.Addpenalty(function(err, row,next) {

                if (err) {
                    console.log('Error');
                }
                else
                {
                    var numrows = row.length;
                    if (numrows == 0) {
                        console.log('not');
                    }
                    else
                    {
                        for (let i=0;i<row.length;i++) { 
                        
                        const to = row[i].Login_ID;
                        var penalty=row[i].Penalty;
                        var amount=row[i].Amount;
                        console.log(to);
                        NODE_TLS_REJECT_UNAUTHORIZED='0'
                        const subject = 'Reminder for Penalty add into your amount'
                        const message = `<h1>Penalty Amount </h1> <h2> Penalty : ${penalty} <br/> Total Maintenance : ${penalty+amount} </h2>`;                       const mailObj = {to,subject,message}
                        demo.sendMail(mailObj)
                        }
                    }
                }    
                 res.render('maintenance_detail',{data:row});
    
            });
             // res.render('maintenance_detail',{data:row});

            }
 // res.render('maintenance_detail',{data:row});
});

router.get("/", function(req, res, next) {
let ts = Date.now();
        let date = new Date(ts);
        if(date.getDate()==27)
        {
          db.query("select Login_ID from member",(function(err,rows)
          {
            console.log(rows[0].Login_ID);
              maintenance.addmaintenance(rows,(err,row)=>{
                if(err)
                {
                  res.render('Login');
                }
                else
                {
                      res.render('Login'); 
                }
              })

           
          }));
          
        
      }
        if(date.getDate() >= 26){
            console.log("grater 28..");
            reminder.getAllMail(function (err, row) {
                if (err) {
                    console.log('Error');
                }
                else
                {
                    var numrows = row.length;
                    if (numrows == 0) {
                        console.log('not');
                    }
                    else
                    {
                        for (let i=0;i<row.length;i++) { 
                        
                        const to = row[i].Login_ID;
                        console.log(to);
                        NODE_TLS_REJECT_UNAUTHORIZED='0'
                        const subject = 'Reminder for Maintenance'
                        const message = '<h3>Please Pay Your maintenence amount for next upcoming month Before 10th day of next month'
                
                       const mailObj = {to,subject,message}
                        demo.sendMail(mailObj)
                        }
                    }
                }        
            });
        }
  //res.render('Login');
});

router.get('/addflat', function(req, res, next) {
  res.render('addFlat');
});

router.get('/maintenance_detail',(req, res, next) =>{
  maintenance.viewmaintenance(function(err,rows){
    console.log("inside index");
      if(err){
        res.json(err);
        res.render('maintenance_detail',{data:rows});
      }
      else{
         // da=JSON.stringify(rows);
          res.render('maintenance_detail',{data:rows});
      }
  });
});

router.get('/addmember',(req, res, next) => {
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
  flatmember.getmember(req.params.id,function(err,rows){
      da=rows;
      if(err){
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


      
router.get('/updateflatdetail/:id?', function(req, res, next) {
  // console.log(req.params.id);
  flat.getFlat(req.params.id, function (err,rows){
      if(err){
        res.json(err);   
        res.render('updateFlat',{data:rows});       
      }
      else{
        res.render('updateFlat',{data:rows});       
      }
  })
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

router.get('/updateapartmentdetail/:id?', function(req, res, next) {
  // res.render('Venue');
  console.log(req.params.id);
  apt.getApartment(req.params.id, function(err,rows){
    //console.log("inside index");
      if(err){
        res.json(err);
        res.render('updateApartment',{data:rows});
      }
      else{
          // da=JSON.stringify(rows);
          res.render('updateApartment',{data:rows});
      }
  });
});

  router.get('/deleteflatmember/:id?', function(req, res, next) {
    // console.log(req.params.id);
    flatmember.deleteMember(req.params.id, (err,rows) => {
      console.log("inside delete");
        if(err){
          res.json(err);
          res.redirect('/viewflatmembers');
        }
        else{
            res.redirect('/viewflatmembers');
        }
    });
  });
  
  router.get('/deleteapartment/:id?', function(req, res, next) {
    console.log(req.params.id);
    apt.deleteApartment(req.params.id, (err,rows) => {
      console.log("inside delete");
        if(err){
          res.json(err);
          res.redirect('/apartment_detail');
        }
        else{
            res.redirect('/apartment_detail');
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

    
  router.get('/addApartment', function(req, res, next) {
    res.render('addApartment');
   // res.json(req.body);
  });
  router.get('/addFestival', function(req, res, next) {
    res.render('addFestival');
   // res.json(req.body);
  });
  
  router.get('/viewcomplaints_admin', function(req, res, next) {
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
        service_cat.getServiceCat(req.params.id,function(err,rows){
          if(err){
            
              res.json(err);
          }
          else{ 
            obj = {
              data: rows
            }; 
            res.render('EditServiceCat',obj);
          }
          
  });
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

router.get("/editServiceDetail/:id?", (req, res, next) => {  
  service_detail.getServiceDetails(req.params.id,function(err,rows){
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
            //obj.data1=data1;
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




//--------------------------------------------User Area-----------------------------------------






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
  service_detail_user.viewservicedetails(function(err,rows){
    if(err){
      res.json(err);
      res.render('index_user',{data:rows});
    }
    else{
      res.render('view_service_user',{data:rows});
    }
  });
});


router.get("/profile_users", (req, res, next) => {
    //var id="honeyshah@gmail.com";
    pro_user.viewprofile(global.id,function(err,rows){
    if(err){
      res.json(err);
    }
    else{ 
      obj = {
        data: rows
      }; 
      res.render('profile_user',obj);
    }
  });
});


router.get('/index_user', function(req, res, next) {
  console.log("ab"+global.id);
  res.render('index_user');
});


router.get('/payMaintenance', function(req, res, next) {
  console.log("ab"+global.id);
  fund.viewamount(function(err,rows){
    if(err){
      res.json(err);
      res.render('payMaintenance',{data:rows});
    }
    else{
      res.render('payMaintenance',{data:rows});
    }
  });
  //res.render('');
});


router.get('/sidebar_user', function(req, res, next) {

  res.render('sidebar_user');
});


router.get('/paymentpage', (req, res) => {

  maintenance1.addmaintenance(global.id, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");                          
                    res.sendFile('D:/Daiict/Sem_3/Project/e_appartment/admin/index.html');
            }
            else {
                console.log("Service Error");
                res.send(err);
          }
        }
    }); 
});

  //res.render('Login');
router.get('/responsepage', (req, res) => {
  res.render('response');
});

module.exports = router;
