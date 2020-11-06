var signin = require("../model/signin_model");
var express = require("express");
var router = express.Router();

router.get('/addflat',(req, res, next) => {
});

router.post("/insertFlat", (req, res, next) => {
    // console.log(req.body);
    signin.addFlat(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
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
