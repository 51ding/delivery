var {Address} = require("../models");

module.exports = {
  save: async function (model) {
    var address = new Address(model);
    return await address.save();
  },
  getDefaultByOpenid: async openid => {
    return await Address.find({openid:openid,isdefault:true});
  },
  getAddressById:async id => {
    return await Address.findById(id)
  },
  getAddressByOpenId:async openid => {
    return await Address.find({openid:openid});
  },
  deleteAddressById:async id =>{
    return await Address.findByIdAndRemove(id);
  },
  findByIdAndUpdate:async (id,model) => {
    return await Address.findByIdAndUpdate(id,model);
  },
  update:async (query,option) =>{
    return await Address.updateMany(query,option);
  }
}
