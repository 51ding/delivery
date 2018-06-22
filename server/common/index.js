var xml2js = require("xml2js");

module.exports = {

  /*格式化时间为 yyyyMMddHHmmss 格式*/
  formateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = fillingDate(date.getMonth() + 1);
    var day = fillingDate(date.getDate());
    var hour = fillingDate(date.getHours());
    var minutes = fillingDate(date.getMinutes());
    var seconds = fillingDate(date.getSeconds());
    return [year, month, day, hour, minutes, seconds].join("");
  },

  /*xml转对象*/
  xmlToObject(xml) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if(err) return reject(err);
        var xmlData=result.xml;
        var xmlObject={};
        for(var key in xmlData)
          xmlObject[key]=xmlData[key][0];
        resolve(xmlObject);
      })
    })
  },

  /*产生时间戳*/
  createTimeStamp: function() {
    return parseInt(new Date().getTime() / 1000) + '';
  },

  /*生成随机字符串*/
  createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
  }
}


function fillingDate(time) {
  return time < 10 ? "0" + time : time;
}
