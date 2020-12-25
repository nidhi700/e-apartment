var flatmember = require("../model/flatmember_model");
var express = require("express");
var router = express.Router();
var generator = require('generate-password');
var demo = require('../model/emailverify') 
var password = generator.generate({
    length: 10,
    numbers: true
});

router.post("/insertMember", (req, res, next) => {
    // console.log(req.body);
    flatmember.addFlatMember(req.body,password, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                console.log("ans");       
                // res.json(req.body);
                const to = req.body.email;
                NODE_TLS_REJECT_UNAUTHORIZED='0';
                const subject = 'Login Credentials..';
                const message = `<h1>Welcome to E-Apartment...!!! </h1> <h2> Email : ${req.body.email} <br/> Password : ${password} </h2>`;
                const mailObj = {to,subject,message};
                demo.sendMail(mailObj);
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