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
  router.get('/sidebar', function(req, res, next) {
    res.render('sidebar', { title: 'Express' });
   // res.json(req.body);
  });
  
 
module.exports = router;
