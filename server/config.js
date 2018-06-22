module.exports = {
  port:3000,
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
    appID:"wxe6f2aa23be7998f8",
    appsecret:"8f6033dcbf72f5c82d973a449b4d776b",
    token:"dxn",
    merchantNumber:"1502231861",
    apiSecret:"0ci7bYic0PY1Cr0rnhumzvrJjPNQrWFx"
  }
}
