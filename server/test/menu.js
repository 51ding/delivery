var init=require("../wechat/menu/init");
var pay=require("../wechat/menu/pay");
var fs=require("fs");



var x=JSON.stringify(pay());
fs.writeFile("./menu.txt",x,(err)=>{
	if(!err) console.log("保存成功！");
})
