var init=require("../wechat/menu/init");
var fs=require("fs");



var x=init();
fs.writeFile("./menu.txt",x,(err)=>{
	if(!err) console.log("保存成功！");
})
