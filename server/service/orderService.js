var {Order,Express} = require("../models");

module.exports={
  async getOrderByNo(no){
    return await Order.findOne({out_trade_no:no})
           .populate("send").populate("receive").exec();
  },
  async getSMSByOpenid(openid){
    var sms=await SMS.findOne({openid:openid});
  },
  async saveExpress(model){
    var express=new Express(model);
    return await express.save();
  },
  async getOrderByOpenId(openid){
    var order=await Order.find({openid:openid}).populate("send").populate("receive").exec();
    var express=await  Express.find({openid:openid});
    return {order,express};
  }

}



