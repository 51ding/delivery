var mongoose=require("mongoose");
var {Schema}=mongoose;

var AddressSchema=new Schema({
  openid:String,
  name:String,
  phone:String,
  street:Array,
  streetValue:Array,
	detail:String,
	tag:String,
	ismine:Boolean,
  isdefault:Boolean
})


mongoose.model("address",AddressSchema);
