var signin = require("../model/apartment_model");
var express = require("express");
var router = express.Router();

router.get('/addapartment',(req, res, next) => {
});

router.post("/insertApartment", (req, res, next) => {
    // console.log(req.body);
    signin.addApartment(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/apartment_detail');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

module.exports = router;