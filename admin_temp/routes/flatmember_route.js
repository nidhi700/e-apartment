var signin = require("../model/flatmember_model");
var express = require("express");
var router = express.Router();

router.get('/addmember',(req, res, next) => {
    console.log("in get add member");
    flatmember.getFlatNo((err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            var numrows = row.length;
            if (numrows > 0) {
                console.log(row);       
                // res.json(req.body);
                // res.redirect('/index');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

router.post("/insertFlat", (req, res, next) => {
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
                    res.redirect('/index');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});

module.exports = router;