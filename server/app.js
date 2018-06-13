const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session=require("koa-session");
var WeChat=require("koa-easywechat");
require("./models");

const index = require('./routes/index')
const users = require('./routes/users')
const auth=require("./auth");
const config=require("./config");

app.keys = config.keys;




// error handler
onerror(app)
app.use(logger())
app.use(WeChat({
  appID:"wx4277ef79398014a1",
  appsecret:"2e1dbf5ca9b1634364370b63fe67e3e8",
  token:"caowei",
  isSafeModel:false
},async function (next){
	 this.reply = {
        type: "text",
        content: "感谢关注【甘肃城乡服务平台】\n 现在所有功能仍在紧张开发中，敬请期待！"
      }
 }
));





app.listen(833,()=>{
  console.log("server is running")
});
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(session(config.session,app))

/*app.use(auth);*/


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000,()=>{
	console.log("server is runining...");
})
