var mongoose=require("mongoose");
var {Schema}=mongoose;

var MessageSchema=new Schema({
  openid:{type:String,required:true},
  src:String,
  title:String,
  fallbackSrc:String,
  desc:String
})

mongoose.model("message",MessageSchema);
