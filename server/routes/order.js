var router = require("koa-router")();
var {formateTime, createTimeStamp, createNonceStr} = require("../common");
var {createUnifiedorder} = require("../common/business");
var {SendDelivery, Order} = require("../service");
var {wechat} = require("../config");

router.prefix('/order')

router.post("/save", async ctx => {
  var order = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  /*var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";*/
  var {openid} = ctx.session.user;
  order.openid = openid;
  var out_trade_no = formateTime();
  var params = {
    total_fee: order.cost * 100,
    openid: openid
  };
  order.out_trade_no = out_trade_no;
  order.total_fee = params.total_fee;
  try {
    var unifiedorder = await createUnifiedorder(params);
    var returnorder = await SendDelivery.saveOrder(order);
    var result = {order: returnorder, unifiedorder: unifiedorder};
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
});

router.post("/detail", async ctx => {
  var {no} = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await Order.getOrderByNo(no);
    response.data = result;
  }
  catch (e) {
    response.errcode = "-1";
    response.errmsg = e.message;
  }
  ctx.body = response;
})

router.post("/pay/notify", async ctx => {
  var data = ctx.request.body;
  console.log(data);
  ctx.body = data;
})

router.post("/exress/save", async ctx => {
  var express = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  var {openid} = ctx.session.user;
  express.openid = openid;
  var out_trade_no = formateTime();
  var params = {
    total_fee: express.cost * 100,
    openid: openid
  };
  express.out_trade_no = out_trade_no;
  express.total_fee = params.total_fee;
  try {
    var unifiedorder = await createUnifiedorder(params);
    var returnorder = await Order.saveExpress(express);
    var result = {order: returnorder, unifiedorder: unifiedorder};
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
})

router.post("/all", async ctx => {
  var {openid} = ctx.session.user;
 /* var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";*/
  var response = {errcode: 0, errmsg: ""};
  try {
    var result=await Order.getOrderByOpenId(openid);
    response.data=result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
})

module.exports = router;

