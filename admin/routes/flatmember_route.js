var flatmember = require("../model/flatmember_model");
var express = require("express");
var router = express.Router();

router.post("/insertMember", (req, res, next) => {
    // console.log(req.body);
    flatmember.addFlatMember(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/viewflatmembers');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

router.post("/updateMember", (req, res, next) => {
    // console.log(req.body);
    flatmember.updateFlatMember(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/viewflatmembers');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});
module.exports = router;