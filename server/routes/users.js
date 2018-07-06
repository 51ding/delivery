const router = require('koa-router')();
var mongoose = require("mongoose");
var {User} = require("../service");
var {createNumber} = require("../common");
var {sendMessage} = require("../wechat/sms");


router.prefix('/user')

/*登录接口*/
router.post('/login', async function (ctx, next) {
  var {loginname, password} = ctx.request.body;
  var msg;
  try {
    var user = await User.getOneUserByLoginName(loginname);
    if (!user) msg = "用户不存在"
    else {
      if (user.password != password) msg = "密码错误！";
      else ctx.session.user = user;
    }
  }
  catch (e) {
    msg = e.message;
  }
  if (msg) {
    console.log(msg);
    return await ctx.render("login", {
      msg: msg,
    })
  }

  ctx.redirect("/index", {loginname: loginname});
})

/*登出接口*/
router.post("/logout", async function (ctx, next) {
  ctx.session.user = null;
  ctx.redirect("/");
})

router.post("/get", async ctx => {
  var {openid} = ctx.session.user;
  /*var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";
  /!*上线需要删除！*!/
  ctx.session.user=await User.getOneUserByOpenId(openid);*/

  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await User.getOneUserByOpenId(openid);
    response.data = result;
  }
  catch (e) {
    response.errcode = "-1";
    response.message = e.message;
  }
  ctx.body = response;
})

router.post("/sms/send", async ctx => {
  var sms = ctx.request.body;
  var {openid} = ctx.session.user;
  var response = {errcode: 0, errmsg: ""};
  sms.openid = openid;
  sms.vertification = createNumber();
  sms.Expired = Date.now() + 15 * 60 * 1000;
  try {
    var returnSMS = await User.findSmsByQuery({openid:openid,phone:sms.phone});
    /*在有效期内*/
    if(returnSMS && returnSMS.Expired > Date.now()){
      response.errcode=-1;
      response.errmsg="验证码已发送,请检查您的短信,验证码15分钟之内有效！";
    }
    else{
      await User.deleteSmsByQuery({openid:openid,phone:sms.phone});
      var message=await sendMessage(sms.phone,sms.vertification);
      if(message.result==0 && message.errmsg=="OK"){
        var result = await User.saveSMS(sms);
      }
    }
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
});

router.post("/sms/verify", async ctx => {
  var {openid} = ctx.session.user;
  var {code,phone} = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await User.findSmsByQuery({openid:openid,phone:phone});
    if (!result) throw new Error("您还未发送验证码！");
    if (result.vertification != code) throw new Error("验证码错误!");
    await User.update(openid, {isverify:true});
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
});

module.exports = router;
