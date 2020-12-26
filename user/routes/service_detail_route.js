var servicedetail = require("../model/service_detail_model");
var express = require("express");
var router = express.Router();


router.post("/insertServiceDetail", (req, res, next) => {
    // console.log(req.body);
    var sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.sampleFile;
  let uploadPath = 'D:/e_appartment/admin/public/images/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded to '+uploadPath);
  });

    servicedetail.addservicedetails(req.body,sampleFile, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    console.log("ans");                          
                    res.redirect('/service_detail');
            }
            else {
                console.log("Service Error");
                res.send(err);
          }
        }
    });
});

router.post("/updateServiceDetail1", (req, res, next) => {
    // console.log(req.body);
     var sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.sampleFile;
  let uploadPath = 'D:/e_appartment/admin/public/images/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded to '+uploadPath);
  });

    servicedetail.updateServicedetails(req.body,sampleFile, (err, row) => {
        if (err) {
            res.send(err);
            console.log("err");
        }
        else {
            if (row) {
                    //console.log("ans");       
                   // res.json(req.body);
                    res.redirect('/service_detail');
            }
            else {
                //console.log("hh");
                res.send(err);
          }
        }
    });
});
module.exports = router;