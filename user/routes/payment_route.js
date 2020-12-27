// For Staging 
var environment = Paytm.LibraryConstants.STAGING_ENVIRONMENT;

// For Production 
// var environment = Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT;

// Find your mid, key, website in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
var mid = "JGdKLy60175996680868";
var key = "iQzCKrnOW_A9KY1B";
var website = "worldpressplg";
//var client_id = "YOUR_CLIENT_ID_HERE";

// var callbackUrl = "MERCHANT_CALLBACK_URL";
// Paytm.MerchantProperties.setCallbackUrl(callbackUrl);

Paytm.MerchantProperties.initialize(environment, mid, key, website);
// If you want to add log file to your project, use below code
// Paytm.Config.logName = "[PAYTM]";
// Paytm.Config.logLevel = Paytm.LoggingUtil.LogLevel.INFO;
// Paytm.Config.logfile = "/path/log/file.log";