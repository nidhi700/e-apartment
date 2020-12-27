var maintenance = require("../model/maintenance_user");
var express = require("express");
var router = express.Router();


router.post("/insertServiceCat", (req, res, next) => {
    // console.log(req.body);
    maintenance.addcat(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");                          
                    res.redirect('/servicecat');
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
    servicecat.updateServiceCategory(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/servicecat');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

module.exports = router;