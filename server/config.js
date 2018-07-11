module.exports = {
  port:3000,
  domain:"houhanbin.imwork.net",
  env:"development",
  keys:['im a newer secret', 'i like turtle'],
  connectionString: "mongodb://test:123@127.0.0.1:27017/delivery",
  session: {
    key: "koa:sess",
    maxAge: 86400000,
    overwrite: true,
    httpOnly: false,
    signed: true,
    rolling: false,
    renew: false,
  },
  wechat:{
    appID:"wx2ea795e409b2c674",
    appsecret:"e4632492abb3de0943fc7ca20c4b27d0",
    token:"houhanbin",
    merchantNumber:"",
    apiSecret:"",
    /*支付结果回调*/
    notify_url:"/order/pay/notify"
  },
  /*短信相关配置*/
  sms:{
    ADDID:"1400105292",
    APPKEY:"f69a2564dc6151fbe066345664b2a26c"
  }
}
