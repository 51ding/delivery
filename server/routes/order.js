var router=require("koa-router")();
var {formateTime, createTimeStamp, createNonceStr} = require("../common");
var {createUnifiedorder} =require("../common/business");
var {SendDelivery} = require("../service");
var WxPay = require("../wechat/pay");
var {wechat} = require("../config");

router.prefix('/order')

router.post("/save",async ctx => {
  var order = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";
  /* var {openid}=ctx.session.user;*/
  order.openid=openid;
  var out_trade_no=formateTime();
  var params = {
    total_fee: 1,
    openid:openid
  };

  order.out_trade_no=out_trade_no;
  order.total_fee=params.total_fee;
  try {
    var unifiedorder=await createUnifiedorder(params);
    console.log(unifiedorder);
    var result=await SendDelivery.saveOrder(order);
    response.data=result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg= e.message;
  }
  ctx.body = response;
});

module.exports=router;

