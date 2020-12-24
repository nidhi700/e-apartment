var com = require("../model/complaints_model_user");
var express = require("express");
var router = express.Router();


router.post("/insertCom", (req, res, next) => {
    com.addcomplaints(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                res.redirect('/viewcomp');
            }
            else {
                res.send(err);
          }
        }
    });
});
router.post("/updateCom", (req, res, next) => {
    // console.log(req.body);
    com.updatecomplaints(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/viewcomp');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});
module.exports = router;