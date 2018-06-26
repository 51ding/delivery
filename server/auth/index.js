"use strict"

var {wechat} = require("../config");
var {User}=require("../service");
var rp=require("request-promise");


var OAUTH_TYPE = {
  openid: "snsapi_base",
  userInfo: "snsapi_userinfo"
}

async function getOpenIdByCode(code) {
  var url=`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat.appID}&secret=${wechat.appsecret}&code=${code}&grant_type=authorization_code`;
  var openIdObject=await rp(url);
  return openIdObject;
}

function initUrl(url, oauthType=OAUTH_TYPE.userInfo) {
  url=encodeURI(url);
  var expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var reg = new RegExp(expression);
  if (!reg.test(url))
    throw new Error("无效的url");
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechat.appID}&redirect_uri=${url}&response_type=code&scope=${oauthType}&state=STATE#wechat_redirect`;
}

async function oauth(ctx,next){
  var {code,state}=ctx.query;
  var openIdJson=JSON.parse(await getOpenIdByCode(code));
  ctx.userInfo=await getUserInfoByOpenId(openIdJson);
  await next();
}

async function getUserInfoByOpenId(openIdJson){
  var {access_token,openid}=openIdJson;
  var url=`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
  var userInfo=await rp(url);
  return JSON.parse(userInfo);
}


module.exports={
  OAUTH_TYPE,
  initUrl,
  oauth
}



