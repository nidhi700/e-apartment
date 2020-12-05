var nodemailer = require('nodemailer');

var item={
    sendMail:function(demo,callback){   
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              //  user: 'jvquestionpaper123@gmail.com',
              //  pass: 'jvdaiict@123'
              user: 'patelvvj@gmail.com',
              pass: 'daiict@1234'
            }
        });
        
        var mailOptions = {
            from: 'vasanivibhuti98@gmail.com',
            to: demo.to,
            subject:demo.subject,
            html:demo.message
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
module.exports=item;