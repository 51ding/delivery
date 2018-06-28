var {User, SMS} = require("../models");

exports.newAndSave = async (loginname, password) => {
  var user = new User();
  user.loginname = loginname;
  user.password = password;
  var result = await user.save();
  return result;
}

exports.save = async model => {
  var user = new User(model);
  return await user.save();
}

exports.getOneUserByLoginName = async loginname => {
  return User.findOne({loginname});
}

exports.getUsersByQuery = async query => {
  return User.find(query);
}

exports.getOneUserByOpenId = async openid => {
  return User.findOne({openid: openid});
}

exports.update =async (openid,options) =>{
  return await User.update({openid:openid},options);
}


/*保存短信验证码*/
exports.saveSMS = async model => {
  var sms = new SMS(model);
  return await sms.save();
}

exports.findSmsByOpenId = async openid => {
  return await SMS.findOne({openid: openid});
}

exports.deleteSmsByQuery = async query => {
  return await SMS.deleteMany(query);
}

exports.findSmsByQuery=async query => {
  return await SMS.findOne(query);
}

