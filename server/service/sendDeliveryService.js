var {Address}=require("../models");

module.exports={
	 save:async function(model){
			var address=new Address(model);
			return await address.save();
	 },
	 getDefaultByOpenid:async openid => {
		 
	 }
}