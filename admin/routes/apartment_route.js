var apartment = require("../model/apartment_model");
var express = require("express");
var router = express.Router();

router.post("/updateApartment", (req, res, next) => {
    // console.log(req.body);
    apartment.updateApartment(req.body, (err, row) => {
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

router.post("/insertApartment", (req, res, next) => {
    // console.log(req.body);
    apartment.addApartment(req.body, (err, row) => {
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