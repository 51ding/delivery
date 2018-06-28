var QcloudSms = require("qcloudsms_js");
var {sms} = require("../../config");
var util=require("util");


function sendMessage(phone,params) {
  return new Promise((resolve, reject) => {
    var qcloudsms = QcloudSms(sms.ADDID, sms.APPKEY);
    var templId = 147224;
    var ssender = qcloudsms.SmsSingleSender();
    params=[params];
    ssender.sendWithParam(86, phone, templId,
      params, "", "", "",function (err, res, resData) {
        if(err) return reject(err);
        resolve(resData);
      });
  })
}


module.exports={
  sendMessage
}

