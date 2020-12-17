var servicedetail = require("../model/service_detail_model");
var express = require("express");
var router = express.Router();


router.post("/insertServiceDetail", (req, res, next) => {
    // console.log(req.body);
    servicedetail.addservicedetails(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");                          
                    res.redirect('/service_detail');
            }
            else {
                console.log("Service Error");
                res.send(err);
          }
        }
    });
});

router.post("/updateServiceCat", (req, res, next) => {
    // console.log(req.body);
    servicedetail.updateServiceCategory(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/service_detail');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});
module.exports = router;