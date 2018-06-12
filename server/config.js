module.exports = {
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
  ignoreUrl:[
    "/user/login",
    "/user/register",
    "/login",
    "/"
  ]
}
