const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  if(ctx.session.user) return await ctx.render("index");
  await ctx.render('login',{msg:""})
})


router.get('/index', async (ctx, next) => {
  await ctx.render("index");
})


module.exports = router
