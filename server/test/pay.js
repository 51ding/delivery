var WxPay=require("../wechat/pay");
var {formateTime,xmlToObject}=require("../common");
var {payTemplate}=require("../wechat/pay/parameterTemplate");
var {unifiedorder}=require("./mock");

var fs=require("fs");

var params={
  out_trade_no:formateTime(),
  total_fee:1,
  spbill_create_ip:"127.0.0.1",
  notify_url:"http://houhanbin.imwork.net/pay/result",
}


var pay=new WxPay(params);

//console.log(pay);
/*var template=payTemplate(pay);
fs.writeFile("./menu.txt",template,(err)=>{
  if(!err) console.log("保存成功！");
})*/

 (
   async function () {
     var result=await xmlToObject(unifiedorder);
     console.log(result);
   }
 )()

//console.info(pay);
