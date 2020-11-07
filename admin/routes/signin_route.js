var signin = require("../model/signin_model");
var express = require("express");
var router = express.Router();

router.get('/',(req, res, next) => {
});

router.post("/login", (req, res, next) => {
    signin.isauth1(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            var numrows = row.length;
            if (numrows > 0) {
                console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/index');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

module.exports = router;
