var signin = require("../model/signin_model");
var express = require("express");
var router = express.Router();
router.post('/login', (req, res, next) => {
    
    signin.isauth1(req.body, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            var numrows = row.length;

            if (numrows == 0) {
                res.send({
                    result: -1
                });
            }
            else {
                let facultyStatus = row[0].Status;
                if(facultyStatus==0){
                    res.send({
                        result: 1
                    }); 
                }
                else{
                    res.send({
                        result: -2
                    });
                }
            }
        }
    });
});

module.exports = router;
