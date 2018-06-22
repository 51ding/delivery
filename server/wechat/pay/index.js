var rp = require("request-promise");
var {wechat} = require("../../config");
var crypto = require('crypto');
var {payTemplate} = require("./parameterTemplate");
var {xmlToObject, createNonceStr} = require("../../common");

class WxPay {
  constructor(parameter) {
    this.appid = wechat.appID;
    this.mch_id = wechat.merchantNumber;
    this.nonce_str = createNonceStr();
    this.body = "北京鼎信创智-软件服务费";

    parameter = parameter || {};
    /*商户订单号*/
    this.out_trade_no = parameter.out_trade_no;
    /*商品标价（单位：分）*/
    this.total_fee = parameter.total_fee;
    /*终端IP*/
    this.spbill_create_ip = parameter.spbill_create_ip;
    /*通知地址,微信支付结果的回调地址*/
    this.notify_url = parameter.notify_url;
    /*公众号支付，JSAPI */
    this.trade_type = "JSAPI";
    this.openid = parameter.openid;
    this.sign = this.createSign();
  }


  /*对象拼接成字符串*/
  contactKeyValue(obj) {
    var keys = Object.keys(obj).sort();
    var newObj = {};
    keys.forEach(key => {
      newObj[key] = obj[key];
    });
    var stringA = "";
    for (var key in newObj) {
      if (stringA.length > 0) stringA += "&";
      stringA += `${key}=${newObj[key]}`;
    }
    return stringA;
  }

  /*生成签名算法*/
  createSign() {
    var args = {
      appid: this.appid,
      mch_id: this.mch_id,
      nonce_str: this.nonce_str,
      body: this.body,
      out_trade_no: this.out_trade_no,
      total_fee: this.total_fee,
      spbill_create_ip: this.spbill_create_ip,
      notify_url: this.notify_url,
      trade_type: this.trade_type,
      openid: this.openid
    };

    var stringA = this.contactKeyValue(args);
    var stringSignTemp = stringA + `&key=${wechat.apiSecret}`;
    var sign = crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex');
    return sign.toUpperCase();
  }

  createJsApiSign(timeStamp, nonceStr, packageStr, signType) {
    var args = {
      appId: this.appid,
      timeStamp:timeStamp,
      nonceStr:nonceStr,
      packageStr:packageStr,
      signType:signType
    };
    var stringA = this.contactKeyValue(args).replace("packageStr", "package");
    var stringSignTemp = stringA + `&key=${wechat.apiSecret}`;
    var sign = crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex');
    return sign.toUpperCase();
  }

  /*统一下单*/
  async unifiedorder() {
    var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    var options = {
      uri: url,
      method: "POST",
      body: payTemplate(this)
    }
    var result = await rp(options);
    var xmlObject = await xmlToObject(result);
    return xmlObject;
  }


}


module.exports = WxPay;




