var {Order} = require("../models");

module.exports={
  async getOrderByNo(no){
    return await Order.findOne({out_trade_no:no})
           .populate("send").populate("receive").exec();
  },
  async getSMSByOpenid(openid){
    var sms=await SMS.findOne({openid:openid});
  }
}



