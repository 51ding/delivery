const {ignoreUrl}=require("../config");

module.exports=async (ctx,next) => {
  //免登录的
  if(!ignoreUrl.includes(ctx.path)){
    var user=ctx.session.user;
    if(user) return await next();
    ctx.redirect("/");
  }
  else{
    await next();
  }
}

