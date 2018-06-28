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
  unionid:String,
  isverify:{type:Boolean,default:false}
});


/*短信验证码实体，一个手机对应一个验证码*/
var SMSSchema=new Schema({
  openid:{type:String,requreid:true},
  vertification:{type:String,requreid:true},
  Expired:{type:Number,required:true},
  phone:{type:String,required:true}
});

mongoose.model("user",UserSchema);
mongoose.model("sms",SMSSchema);
