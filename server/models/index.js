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
require("./user");
exports.User=mongoose.model("user");
//初始化所有的schema

