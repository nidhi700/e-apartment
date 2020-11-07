var express = require('express');
var router = express.Router();
var signin = require("../model/signin_model");
var flat = require("../model/flat_model");
var db=require('../dbconnection');

var da="";

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
 // res.json(req.body);
});
router.get("/", function(req, res, next) {
      res.render('Login');
     // res.json(req.body);
  });
  router.get('/addflat', function(req, res, next) {
    res.render('addFlat', { title: 'Express' });
   // res.json(req.body);
  });
  router.get('/addtenant', function(req, res, next) {
    res.render('addTenant', { title: 'Express' });
   // res.json(req.body);
  });
  router.get('/viewflatmembers', function(req, res, next) {
    flat.viewmember(function(err,rows){
      console.log("inside indsx");
        if(err){
          res.json(err);
          res.render('view_flat_members',{data:rows});
        }
        else{
           // da=JSON.stringify(rows);
            res.render('view_flat_members',{data:rows});
        }
    });
   // res.json(req.body);
  });
 
  
  router.get('/viewflatdetails', function(req, res, next) {
    //   res.render('Venue');
       flat.viewflat(function(err,rows){
          console.log("inside indsx");
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
      
  router.get('/viewcomplaints', function(req, res, next) {
    res.render('viewComplaints', { title: 'Express' });
   // res.json(req.body);
  });
  router.get('/festivalDetails', function(req, res, next) {
    res.render('festival_details', { title: 'Express' });
   // res.json(req.body);
  });
  router.get('/sidebar', function(req, res, next) {
    res.render('sidebar', { title: 'Express' });
   // res.json(req.body);
  });
  
 
module.exports = router;
