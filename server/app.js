const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session");
var WeChat = require("koa-easywechat");
//require("./models");

const index = require('./routes/index')
const users = require('./routes/users')
//const auth=require("./auth");
const config = require("./config");

app.keys = config.keys;

var init = require("./wechat/menu/init");


// error handler
onerror(app);
app.use(logger())
app.use(WeChat({
    appID: "wx2ea795e409b2c674",
    appsecret: "e4632492abb3de0943fc7ca20c4b27d0",
    token: "houhanbin",
    isSafeModel: false
  }, async function (next) {
    var message = this.message;
    var wechat = this.wechat;
    if (message.MsgType == "text") {
      if (message.Content == "createMenu") {
        var msg="生成成功！";
        try {
          await wechat.createMenu(init());
        }
        catch (e) {
          msg="生成失败！"+e.message;
        }

        this.reply = {
          type: "text",
          content:msg
        }
      }
      else {
        this.reply = {
          type: "text",
          content: "感谢关注【甘肃城乡服务平台】\n 现在所有功能仍在紧张开发中，敬请期待！"
        };
      }
    }
  }
));

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(session(config.session, app))

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

app.listen(config.port, () => {
  console.log(`server is runining at ${config.port} Port`);
})
