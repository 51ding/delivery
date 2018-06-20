var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  loginname: {type: String},
  password:{type:String},
  createdTime:{type:Date,default:new Date()},
  openid:{type:String,required:true},
  nickname:{type:String},
  sex:Number,
  province:String,
  city:String,
  country:String,
  headimgurl:String,
  privilege:Array,
  unionid:String
});

mongoose.model("user",UserSchema);
