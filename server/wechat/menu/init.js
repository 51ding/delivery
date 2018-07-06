var {Menu, Button, BUTTON_TYPE} = require("./");
var oauth = require("../../auth");

module.exports = function () {
  var menu = new Menu();
  var one = initFirstLevel();
  var two = initSecondStep();
  var three = initThirdStep();
  menu.add(one);
  menu.add(two);
  menu.add(three);
  return menu;
}


//一级菜单
function initFirstLevel() {
  var redirect = "http://houhanbin.imwork.net/";
  var express = "http://houhanbin.imwork.net/express";
  var order="http://houhanbin.imwork.net/order";
  var one = new Button({
    type: BUTTON_TYPE.VIEW,
    name: "快递代发",
    url: oauth.initUrl(redirect),
    isSub: true
  });
  var two = new Button({
    type: BUTTON_TYPE.VIEW,
    name: "快递代收",
    url: oauth.initUrl(express),
    isSub: true
  });
  var three = new Button({
    type: BUTTON_TYPE.VIEW,
    name: "我的订单",
    url:oauth.initUrl(order),
    isSub: true
  });
  var button = new Button({name: "快递业务"});
  button.add(one);
  button.add(two);
  button.add(three);
  return button;

}


//二级菜单
function initSecondStep() {
  var one = new Button({
    type: BUTTON_TYPE.VIEW,
    name: "农产品",
    url: "http://mp.weixin.qq.com/bizmall/mallshelf?id=&t=mall/list&biz=MzU2NjYyMjMzOQ==&shelf_id=2&showwxpaytitle=1#wechat_redirect",
    isSub: true
  });
  /*var two = new Button({
    type: BUTTON_TYPE.VIEW,
    name: "二手产品",
    url: "http://mp.weixin.qq.com/bizmall/mallshelf?id=&t=mall/list&biz=MzU2NjYyMjMzOQ==&shelf_id=2&showwxpaytitle=1#wechat_redirect",
    isSub: true
  });*/

  var button = new Button({name: "移动商城"});
  button.add(one);
 /* button.add(two);*/
  return button;
}

//一级菜单
function initThirdStep() {
  var leaveMessage="http://houhanbin.imwork.net/message";
  var one = new Button({
    type: BUTTON_TYPE.MEDIA_ID,
    name: "公司简介",
    media_id:"ltcryw-XPadDi1QW_uRc-evcihyE7AeLZnOQoGpso5U",
    isSub: true
  });
  var two = new Button({
    type: BUTTON_TYPE.MEDIA_ID,
    name: "联系我们",
    media_id:"ltcryw-XPadDi1QW_uRc-Z6xFZIKQGaWleRvqLywk4I",
    isSub: true
  });
  var three = new Button({
    type: BUTTON_TYPE.VIEW,
    name: "留言墙",
    url: oauth.initUrl(leaveMessage),
    isSub: true
  });

  var button = new Button({name: "我的服务"});
  button.add(one);
  button.add(two);
  button.add(three);
  return button;
}
