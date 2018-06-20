const router = require('koa-router')()
var {oauth}=require("../auth");
var {User}=require("../service");

router.get('/', async (ctx, next) => {
  if(ctx.session.user) return await ctx.render("index");
  await ctx.render('login',{msg:""})
})


router.get('/message',oauth,async (ctx,next) => {
  var userInfo=ctx.userInfo;
  var user=await User.getOneUserByOpenId(userInfo.openid);
  if(!user){
    user=await User.save(userInfo);
  }
  await ctx.render("message",{
    openid:user.openid,
    nickname:user.nickname,
    country:user.country,
    province:user.province,
    city:user.city
  });
});


module.exports = router
