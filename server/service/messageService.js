var {Message} = require("../models");


/*获取留言列表*/
async function getLeaveMessage(){
  return await Message.find({});
}


/*保存留言*/
async function saveLeaveMessage(messageObj) {
  var message=new Message();
  message.openid=messageObj.openid;
  message.src=messageObj.src;
  message.fallbackSrc=messageObj.fallbackSrc;
  message.title=messageObj.title;
  message.desc=messageObj.desc;
  return await message.save();
}

module.exports={
  saveLeaveMessage,
  getLeaveMessage
}

