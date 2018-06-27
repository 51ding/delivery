var {formateTime, createTimeStamp, createNonceStr} = require(".");
var WxPay = require("../wechat/pay");
var {wechat} = require("../config");
module.exports = {
  /*生成预支付交易单*/
  async createUnifiedorder(param) {
    if (!param || !param.openid || !param.total_fee) throw new Error("生成微信支付交易单参数不全！");
    param.out_trade_no = formateTime();
    param.spbill_create_ip = "127.0.0.1";
    param.notify_url = wechat.notify_url;
    var pay = new WxPay(param);
    //在威信商户平台提前生成一笔订单数据
    var unifiedorder = await pay.unifiedorder();
    unifiedorder.param = param;
    return unifiedorder;
  }
}
