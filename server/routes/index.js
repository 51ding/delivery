const router = require('koa-router')()
var {oauth} = require("../auth");
var {User, Message} = require("../service");
var {formateTime, createTimeStamp, createNonceStr} = require("../common");
var WxPay = require("../wechat/pay");
var {wechat} = require("../config");

router.get('/', oauth,async (ctx, next) => {
  var userInfo = ctx.userInfo;
  var user = await User.getOneUserByOpenId(userInfo.openid);
  if (!user) {
    user = await User.save(userInfo);
  }
  ctx.session.user = user;
	await ctx.render("index");
  /* if (ctx.session.user) return await ctx.render("index");
  await ctx.render('login', {msg: ""}) */
})

router.get("/express",oauth,async (ctx, next) => {
  var userInfo = ctx.userInfo;
  var user = await User.getOneUserByOpenId(userInfo.openid);
  if (!user) {
    user = await User.save(userInfo);
  }
  ctx.session.user = user;
  await ctx.render("express");
})

router.get("/order",oauth,async (ctx, next) => {
  var userInfo = ctx.userInfo;
  var user = await User.getOneUserByOpenId(userInfo.openid);
  if (!user) {
    user = await User.save(userInfo);
  }
  ctx.session.user = user;
  await ctx.render("order");
})


router.get('/message', oauth, async (ctx, next) => {
  var userInfo = ctx.userInfo;
  var user = await User.getOneUserByOpenId(userInfo.openid);
  if (!user) {
    user = await User.save(userInfo);
  }
  ctx.session.user = user;

  var params = {
    out_trade_no: formateTime(),
    total_fee: 1,
    spbill_create_ip: "127.0.0.1",
    /*这里要注意，上线要修改,不应该这么写*/
    notify_url: "http://houhanbin.imwork.net/pay/result",
    openid: user.openid
  }
  var pay = new WxPay(params);
  var result = await pay.unifiedorder();

  var msg = "支付成功";
  var timeStamp = createTimeStamp();
  var nonceStr = createNonceStr();
  var packageStr = `prepay_id=${result.prepay_id}`;
  var paySign = pay.createJsApiSign(timeStamp, nonceStr, packageStr, "MD5");

  if (result.return_code != "SUCCESS" || result.return_msg != "OK")
    msg = "支付失败！";
  await ctx.render("message", {
    openid: user.openid,
    ip: ctx.request.ip,
    msg: msg,
    prepay_id: result.prepay_id,
    appId: wechat.appID,
    timeStamp: timeStamp,
    nonceStr: nonceStr,
    packageStr: packageStr,
    signType: "MD5",
    paySign: paySign
  });
});

router.get("/send/pay", async (ctx, next) => {
  await ctx.render("test");
})


router.get("/message/get", async (ctx, next) => {

  var result = {errcode: 0, errmsg: ""};
  try {
    result.data = await Message.getLeaveMessage();
  }
  catch (e) {
    result.errcode = -1;
    result.errmsg = e.message;
  }
  ctx.body = result;
})

router.post("/message/save", async (ctx, next) => {
  var message = ctx.request.body;
  var result = {errcode: 0, errmsg: ""};
  try {
    var user = ctx.session.user;
    message.openid = user.openid;
    message.src = user.headimgurl;
    message.fallbackSrc = user.headimgurl;
    message.title = user.nickname;
    result.data = await Message.saveLeaveMessage(message);
  }
  catch (e) {
    result.errcode = -1;
    result.errmsg = e.message;
  }
  ctx.body = result;
})


module.exports = router
