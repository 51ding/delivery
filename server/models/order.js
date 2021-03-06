var mongoose = require("mongoose");
var {Schema} = mongoose;
var ObjectId = Schema.Types.ObjectId;

/*发件模型*/
var OrderSchema = new Schema({
  openid: {type: String, required: true},
  merchant: Array,
  itemtype: Array,
  weight: Number,
  cost: Number,
  send: {type: ObjectId, ref: "address"},
  receive: {type: ObjectId, ref: "address"},
  /*微信支付相关字段*/
  //商户订单号
  out_trade_no: {type: String, required: true},
  //标价金额
  total_fee: Number,
  createdon: {type: Date, default: new Date()},
  //是否支付成功
  ispay: {type: Boolean, default: false}
})

/*收件模型*/
var ExpressSchema = new Schema({
  openid: {type: String, required: true},
  name: {type: String, required: true},
  phone: {type: String, required: true},
  township: Array,
  createdon: {type: Date, default: Date.now()},
  items: [{
    no: {type: String, required: true},
    weight: Array,
    itemtype: Array,
    address: String,
    name: String
  }],
  cost: Number,
  //商户订单号
  out_trade_no: {type: String, required: true},
  //标价金额
  total_fee: Number,
  //是否支付成功
  ispay: {type: Boolean, default: false}
});

OrderSchema.pre("save", async function (next) {
  if (this.isNew)
    this.createdon = new Date();
  await next();
})

ExpressSchema.pre("save", async function (next) {
  if (this.isNew)
    this.createdon = new Date();
  await next();
})

mongoose.model("order", OrderSchema);
mongoose.model("express", ExpressSchema);
