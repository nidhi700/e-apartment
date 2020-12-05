var reminder = require("../model/reminder_model");
var express = require("express");
var router = express.Router();
var demo = require("../model/emailverify");

router.post("/reminder_notification", function (req, res, next) {
    reminder.getAllMail(function (err, row) {
        if (err) {
            console.log('Error');
            res.send(err);
        }
        else
        {
            var numrows = row.length;
            if (numrows == 0) {
               
                console.log('not');
            }
            else
            {
                for (let i=0;i<row.length;i++) { 
                
                const to = row[i].Login_ID;
                NODE_TLS_REJECT_UNAUTHORIZED='0'
                const subject = 'Reminder Notification..'
                const message = '<h3> Only 1 Day Left'
                const mailObj = {to,subject,message}
                demo.sendMail(mailObj)
                }
                res.send({
                    result: 1
                });
            }
        }
           
});

});
module.exports = router;