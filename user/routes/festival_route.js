var festival = require("../model/festival_model");
var express = require("express");
var router = express.Router();

router.get('/addfestival',(req, res, next) => {
});

router.post("/insertFestival", (req, res, next) => {
    console.log(req.body);
    festival.addFestival(req.body, (err, row) => {
        console.log("Route Festival name : " + req.body.festivalname);
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/festivalDetails');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

module.exports = router;
