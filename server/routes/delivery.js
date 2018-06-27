var Router = require("koa-router");
var {SendDelivery} = require("../service");
var router = new Router();

router.prefix('/delivery')

router.post("/address/default", async function (ctx, next) {
  /* var user=ctx.session.user;
    var openid=user.openid; */
  var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";
  /*var {openid}=ctx.session.user;*/
  var response = {errcode: 0, errmsg: ""};
  try {
    var data = await SendDelivery.getDefaultByOpenid(openid);
    response.data = data;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
})

router.post("/address/save", async (ctx) => {
  var openid="og1aW1MIOOMpB11i47aGYbt3b2qY";
  /*var {openid} = ctx.session.user;*/
  var address = ctx.request.body;
  address.openid = openid;
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await SendDelivery.save(address);
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg.message;
  }
  ctx.body = response;
})

router.post("/address/get", async ctx => {
  var openid="og1aW1MIOOMpB11i47aGYbt3b2qY";
  /*var {openid} = ctx.session.user;*/
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await SendDelivery.getAddressByOpenId(openid);
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg.message;
  }
  ctx.body = response;
})

router.post("/address/delete", async ctx => {
  var {id} = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await SendDelivery.deleteAddressById(id);
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg.message;
  }
  ctx.body = response;
})

router.post("/address/getbyid", async ctx => {
  var {id} = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await SendDelivery.getAddressById(id);
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg.message;
  }
  ctx.body = response;
})

router.post("/address/update", async ctx => {
  var model = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  try {
    var result = await SendDelivery.findByIdAndUpdate(model._id, model);
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg.message;
  }
  ctx.body = response;
})

router.post("/address/setdefault", async ctx => {
  var {id, ismine} = ctx.request.body;
  var response = {errcode: 0, errmsg: ""};
  var openid = "og1aW1MIOOMpB11i47aGYbt3b2qY";
 /* var {openid}=ctx.session.user;*/
  try {
    await SendDelivery.update({openid: openid, ismine: ismine}, {isdefault: false});
    var old = await SendDelivery.getAddressById(id);
    old.isdefault = true;
    var result = await SendDelivery.findByIdAndUpdate(id, old);
    response.data = result;
  }
  catch (e) {
    response.errcode = -1;
    response.errmsg = e.message;
  }
  ctx.body = response;
})


module.exports = router;
