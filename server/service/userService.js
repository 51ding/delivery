var {User} = require("../models");

exports.newAndSave = async (loginname, password) => {
  var user = new User();
  user.loginname = loginname;
  user.password = password;
  var result = await user.save();
  return result;
}

exports.save=async model => {
  var user=new User(model);
  return await user.save();
}

exports.getOneUserByLoginName = async loginname => {
  return User.findOne({loginname});
}

exports.getUsersByQuery=async query =>{
  return User.find(query);
}

exports.getOneUserByOpenId=async openid => {
  return User.findOne({openid:openid});
}

