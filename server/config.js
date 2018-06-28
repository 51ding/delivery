module.exports = {
  port:3000,
  domain:"houhanbin.imwork.net",
  env:"development",
  keys:['im a newer secret', 'i like turtle'],
  connectionString: "mongodb://127.0.0.1:27017/delivery",
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
    appID:"wx4277ef79398014a1",
    appsecret:"6b7b4a601da83b49af99be870fa5ef7e",
    token:"caowei",
    merchantNumber:"1507840121",
    apiSecret:"0ci7bYic0PY1Cr0rnhumzvrJjPNQrWFx",
    /*支付结果回调*/
    notify_url:"/order/pay/notify"
  },
  /*短信相关配置*/
  sms:{
    ADDID:"1400105292",
    APPKEY:"f69a2564dc6151fbe066345664b2a26c"
  }
}
