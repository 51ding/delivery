var mongoose = require("mongoose");
var {Schema} = mongoose;
var ObjectId=Schema.Types.ObjectId;

var OrderSchema=new Schema({
  openid:{type:String,required:true},
  /*1-发快递，2--收快递*/
  ordertype:Number,
  merchant:Array,
  itemtype:Array,
  weight:Number,
  cost:Number,
  send:{type:ObjectId,ref:"address"},
  receive:{type:ObjectId,ref:"address"}
})

mongoose.model("order",OrderSchema);
