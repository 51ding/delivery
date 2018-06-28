var mongoose = require("mongoose");
var config = require("../config");

mongoose.set("debug", config.env === "development");

const option = {
  server: {
    poolSize: 2
  },
  promiseLibrary: global.Promise
}

mongoose.connect(config.connectionString, (err) => {
  if(err){
    console.log("启动数据库失败",err.message);
    process.exit(1);
  }
})

//初始化所有的schema

require("./user");
require("./message");
require("./address");
require("./order");

exports.User=mongoose.model("user");
exports.Message=mongoose.model("message");
exports.Address=mongoose.model("address");
exports.Order=mongoose.model("order");
exports.SMS=mongoose.model("sms");

