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
    appID:"wx4277ef79398014a1",
    appsecret:"6b7b4a601da83b49af99be870fa5ef7e",
    token:"caowei",
    merchantNumber:"1502231861",
    apiSecret:"0ci7bYic0PY1Cr0rnhumzvrJjPNQrWFx"
  }
}
