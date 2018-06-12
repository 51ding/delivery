var mongoose=require("mongoose");
var {Schema}=mongoose;

var AddressSchema=new Schema({
  openId:String,
  name:String,
  phone:String
})
