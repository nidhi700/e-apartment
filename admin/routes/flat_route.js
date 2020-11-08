var signin = require("../model/flat_model");
var express = require("express");
var router = express.Router();

router.get('/addflat',(req, res, next) => {
});

router.post("/insertFlat", (req, res, next) => {
    // console.log(req.body);
    signin.addFlat(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/viewflatdetails');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});
// Edited 
router.put("/updateFlatDetails" ,function(req, res, next) {
    batch.updateFlat1(req.params.id,req.body, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

/*router.post("/:id", (req, res, next) => {
    // console.log(req.body);
    signin.updateFlat1(req.body.id,req.body (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/viewflatdetails');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});
*/
module.exports = router;