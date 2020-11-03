var express = require('express');
var router = express.Router();
var signin = require("../model/signin_model");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('', { title: 'Express' });
 // res.json(req.body);
});
router.get('/login', function(req, res, next) {
      res.render('Login');
      res.json(req.body);
  });


module.exports = router;
