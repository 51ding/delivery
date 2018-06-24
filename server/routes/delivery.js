var Router=require("koa-router");
var {SendDelivery}=require("../service");
var router=new Router();

router.prefix('/delivery')

router.post("/address/default",async function(ctx,next){
	/* var user=ctx.session.user;
	var openid=user.openid; */
	ctx.body="dsa";
})

router.post("/address/save",async (ctx)=>{
	var openid="houhanbin";
	var address=ctx.request.body;
	address.openid=openid;
	var response = {errcode: 0, errmsg: ""};
	try{
		var result=await SendDelivery.save(address);
		response.data=result;
	}
	catch(e){
		response.errcode=-1;
		response.errmsge.message;
	}
	ctx.body=response;
})

module.exports=router;