var signin = require("../model/signin_model");
var express = require("express");
var router = express.Router();

router.get('/',(req, res, next) => {
});

router.post('/changepassword',(req,res,next)=>
{
    signin.passchange(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");       
                    res.redirect('/');
            }
            else {
                console.log("hh");
                res.send(err);
          }
        }
    });
});
router.post("/", (req, res, next) => {
    signin.isauth1(req.body, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if(row.length>0)
            {
                console.log(row[0].First_Login);
                if(row[0].isSecretory==1)
                {
                    res.redirect('/index');
                }
                else if(row[0].isSecretory==0)
                {
                    console.log('user');
                    if(row[0].First_Login==0)
                    {
                        res.render('changepassword',{data:row});
                    }
                    else
                    {
                        res.redirect('/index_user')
                    }
                }
            }
                else
            {
                console.log('Invalid..');
            }
            
          }
        
    });
});

module.exports = router;
