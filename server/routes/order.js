var router = require("koa-router")();
var {formateTime, createTimeStamp, createNonceStr} = require("../common");
var {createUnifiedorder} = require("../common/business");
var {SendDelivery,Order} = require("../service");
var {wechat} = require("../config");

router.prefix('/order')

router.post("/save", async ctx => {
  var order = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  /*var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";*/
   var {openid}=ctx.session.user;
  order.openid = openid;
  var out_trade_no = formateTime();
  var params = {
    total_fee: 1,
    openid: openid
  };
  order.out_trade_no = out_trade_no;
  order.total_fee = params.total_fee;
  try {
    var unifiedorder = await createUnifiedorder(params);
    var returnorder = await SendDelivery.saveOrder(order);
    var result={order:returnorder,unifiedorder:unifiedorder};
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
});

router.post("/detail",async ctx => {
  var {no}=ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  try{
    var result=await Order.getOrderByNo(no);
    response.data=result;
  }
  catch(e){
    response.errcode="-1";
    response.errmsg = e.message;
  }
  ctx.body = response;
})

router.post("/pay/notify", async ctx => {
  var data=ctx.request.body;
  console.log(data);
  ctx.body=data;
})

module.exports = router;

