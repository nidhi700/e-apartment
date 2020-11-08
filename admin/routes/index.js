var express = require('express');
var router = express.Router();
var signin = require("../model/signin_model");
var flat = require("../model/flat_model");
var flatmember = require("../model/flatmember_model");
var apt = require("../model/apartment_model");
var db=require('../dbconnection');

var da="";


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
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
 

 
  router.get('/viewflatdetails', function(req, res, next) {
      console.log("inside view");
       flat.viewflat(function(err,rows){
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

  router.get('/viewcomplaints', function(req, res, next) {
    res.render('viewComplaints');
   // res.json(req.body);
  });
  router.get('/festivalDetails', function(req, res, next) {
    res.render('festival_details');
   // res.json(req.body);
  });
  router.get('/sidebar', function(req, res, next) {
    res.render('sidebar');
   // res.json(req.body);
  });
   
module.exports = router;
