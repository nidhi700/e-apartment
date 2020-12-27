var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin_route');
var addServiceCatRoute = require('./routes/service_cat_route');
var addServiceDetailRoute = require('./routes/service_detail_route');
var addFlatRouter = require('./routes/flat_route');
var addFlatmemberRouter = require('./routes/flatmember_route');
var addApartmentRouter = require('./routes/apartment_route');

var maintenance=require('./routes/maintenance');

var Secretary = require("./routes/secretory_route");


var FlatRouter = require('./routes/flat_route');
var FlatmemberRouter = require('./routes/flatmember_route');
var ApartmentRouter = require('./routes/apartment_route');

var addFestival = require('./routes/festival_route');
var remindernot = require('./routes/reminder_route');
var fileUpload = require('express-fileupload');

var app = express();
//----------------------Paytm---------------------------------------

//----------------------Paytm---------------------------------------


//------------------------------------------------User Area------------------------------------
var addComplaintsUser = require('./routes/complaints_route_User');
var profile = require('./routes/profile_route_user');
var profile_admin = require('./routes/profile_route_admin');
//------------------------------------------------/User Area----------------------------------


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.id="";
global.id1="";
app.use(indexRouter);
app.use(usersRouter);
app.use(signinRouter);
app.use(addFlatRouter);
app.use(addServiceCatRoute);
app.use(addServiceDetailRoute);
app.use(addFlatmemberRouter);
app.use(addApartmentRouter);
app.use(maintenance);

app.use(Secretary);

app.use(FlatRouter);
app.use(FlatmemberRouter);
app.use(ApartmentRouter);

app.use(addFestival);
app.use(remindernot);

//------------------------------------------------User Area------------------------------------
app.use(addComplaintsUser);
app.use(profile);
app.use(profile_admin);
//------------------------------------------------/User Area------------------------------------


//--------------------------------------------Payment------------------------------------------------


//paytm//
var config = require("./Paytm/config");
var checksum_lib = require("./Paytm/checksum");
const qs = require("querystring");
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/paynow", [parseUrl, parseJson], (req, res) => {
  // Route for making payment

  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone
}
if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
    res.status(400).send('Payment failed')
} else {
    var params = {};
    params['MID'] = config.PaytmConfig.mid;
    params['WEBSITE'] = config.PaytmConfig.website;
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
    params['CUST_ID'] = paymentDetails.customerId;
    params['TXN_AMOUNT'] = paymentDetails.amount;
    params['CALLBACK_URL'] = 'http://localhost:3000/callback';
    params['EMAIL'] = paymentDetails.customerEmail;
    params['MOBILE_NO'] = paymentDetails.customerPhone;


    checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
        var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

        var form_fields = "";
        for (var x in params) {
            form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
        res.end();
        console.log("Paynow res page");
        res.sendFile('/responsepage')
    });
}
});



app.post("/callback", (req, res) => {
  // Route for verifiying payment

  var body = '';

  req.on('data', function (data) {
     body += data;
  });

   req.on('end', function () {
     var html = "";
     var post_data = qs.parse(body);

     // received params in callback
     console.log('Callback Response: ', post_data, "\n");


     // verify the checksum
     var checksumhash = post_data.CHECKSUMHASH;
     // delete post_data.CHECKSUMHASH;
     var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
     console.log("Checksum Result => ", result, "\n");


     // Send Server-to-Server request to verify Order Status
     var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};

     checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

       params.CHECKSUMHASH = checksum;
       post_data = 'JsonData='+JSON.stringify(params);

       var options = {
         hostname: 'securegw-stage.paytm.in', // for staging
         // hostname: 'securegw.paytm.in', // for production
         port: 443,
         path: '/merchant-status/getTxnStatus',
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': post_data.length
         }
       };


       // Set up the request
       var response = "";
       var post_req = https.request(options, function(post_res) {
         post_res.on('data', function (chunk) {
           response += chunk;
         });

         post_res.on('end', function(){
           console.log('S2S Response: ', response, "\n");

           var _result = JSON.parse(response);
             if(_result.STATUS == 'TXN_SUCCESS') {
              res.sendFile('/responsepage')
             }else {
                 res.send('payment failed')
             }
           });
       });

       // post the data
       post_req.write(post_data);
       post_req.end();
       console.log("Callback res page");
       res.sendFile('/responsepage')
      });
     });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
