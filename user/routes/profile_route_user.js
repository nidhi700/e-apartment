var pro = require("../model/profile_model_user");
var express = require("express");
var router = express.Router();


router.post("/updatePro", (req, res, next) => {
    pro.updateprofile(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                res.redirect('/profile_users');
            }
            else {
                res.send(err);
          }
        }
    });
});

module.exports = router;