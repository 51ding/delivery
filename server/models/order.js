var mongoose = require("mongoose");
var {Schema} = mongoose;
var ObjectId=Schema.Types.ObjectId;

var OrderSchema=new Schema({
  openid:{type:String,required:true},
  merchant:Array,
  itemtype:Array,
  weight:Number,
  cost:Number,
  send:{type:ObjectId,ref:"address"},
  receive:{type:ObjectId,ref:"address"},
  /*微信支付相关字段*/
  //商户订单号
  out_trade_no:{type:String,required:true},
  //标价金额
  total_fee:Number
})

mongoose.model("order",OrderSchema);
