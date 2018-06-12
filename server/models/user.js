var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  loginname: {type: String, required: true},
  password:{type:String,required: true},
  createdTime:{type:Date,default:new Date()}
});

mongoose.model("user",UserSchema);
