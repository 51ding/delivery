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
    appID:"wx2ea795e409b2c674",
    appsecret:"e4632492abb3de0943fc7ca20c4b27d0",
    token:"houhanbin"
  }
}
