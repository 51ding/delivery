const router = require('koa-router')();
var mongoose=require("mongoose");
var {User}=require("../service");
router.prefix('/user')

/*登录接口*/
router.post('/login',async function (ctx, next) {
   var {loginname,password}=ctx.request.body;
   var msg;
   try{
     var user=await User.getOneUserByLoginName(loginname);
     if(!user) msg="用户不存在"
     else{
       if(user.password!=password) msg="密码错误！";
       else    ctx.session.user=user;
     }
   }
   catch(e){
     msg=e.message;
   }
  if(msg){
     console.log(msg);
     return await ctx.render("login",{
       msg:msg,
     })
  }

  ctx.redirect("/index",{loginname:loginname});
})


/*登出接口*/
router.post("/logout",async function(ctx,next) {
  ctx.session.user=null;
  ctx.redirect("/");
})

module.exports = router;
