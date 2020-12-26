var express = require("express");
var router = express.Router();
var sec = require('../model/change_secretary');

router.post("/change_secretary", (req, res, next) => {
    // console.log(req.body);
    sec.updateSecretory(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

module.exports = router;