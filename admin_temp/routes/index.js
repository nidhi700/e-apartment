var express = require('express');
var router = express.Router();
var signin = require("../model/signin_model");

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
    res.render('view_flat_members', { title: 'Express' });
   // res.json(req.body);
  });
  router.get('/viewflatdetails', function(req, res, next) {
    res.render('view_flat_details', { title: 'Express' });
   // res.json(req.body);
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
