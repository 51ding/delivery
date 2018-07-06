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
  await ctx.render("message");
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
