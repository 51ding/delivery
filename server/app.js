const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session");
var WeChat = require("koa-easywechat");
var request=require("request");
var requertPromise=require("request-promise");
//require("./models");


const index = require('./routes/index')
const users = require('./routes/users')
const delivery=require('./routes/delivery');
const order=require("./routes/order");
//const auth=require("./auth");
const config = require("./config");

app.keys = config.keys;

var init = require("./wechat/menu/init");
var pay = require("./wechat/menu/pay");

// error handler
onerror(app);
app.use(logger())
app.use(WeChat({
    appID: config.wechat.appID,
    appsecret: config.wechat.appsecret,
    token: config.wechat.token,
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
      else if (message.Content == "素材"){
        var token=await wechat.getAccessToken();
        var urlStr=`https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${token}`;
        var options = {
          method: 'POST',
          uri: urlStr,
          body:{
            type:"news",
            offset:0,
            count:20
          },
          json: true
        };
        console.log(options);
        var result=await requertPromise(options);
        console.info(result);
        this.reply = {
          type: "text",
          content: "成功"
        };
      }
      else {
        this.reply = {
          type: "text",
          content: "感谢关注【甘肃城乡服务平台】,我们将携程为您服务!"
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
app.use(delivery.routes(), delivery.allowedMethods())
app.use(order.routes(), order.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(config.port, () => {
  console.log(`server is runining at ${config.port} Port`);
})
