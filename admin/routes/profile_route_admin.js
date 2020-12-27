var pro = require("../model/profile_model_admin");
var express = require("express");
var router = express.Router();


router.post("/updateProadmin", (req, res, next) => {
    console.log("route\n\n\n");
    pro.updateadminprofile(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                res.redirect('/profile_admin');
            }
            else {
                res.send(err);
          }
        }
    });
});

module.exports = router;