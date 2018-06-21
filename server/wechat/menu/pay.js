var {Menu,Button,BUTTON_TYPE}=require("./");
var oauth=require("../../auth");

module.exports=function(){
  var menu=new Menu();
  var one=initFirstLevel();
 /* var two=initSecondStep();
  var three=initThirdStep();*/
  menu.add(one);
  /*menu.add(two);
  menu.add(three);*/
  return menu;
}






//一级菜单
function initFirstLevel(){
  var redirect="http://houhanbin.imwork.net/message"
  var one=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"快递代收",
    url:oauth.initUrl(redirect),
    isSub:true
  });
  var two=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"快递代发",
    url:"http://houhanbin.imwork.net/index",
    isSub:true
  });
  var three=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"快递代收",
    url:"http://www.baidu.com",
    isSub:true
  });

  var button=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"微信支付",
    url:oauth.initUrl(redirect),
    isSub:true
  });
  return button;

}


//二级菜单
function initSecondStep(){
  var one=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"农产品",
    url:"http://www.baidu.com",
    isSub:true
  });
  var two=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"二手产品",
    url:"http://www.baidu.com",
    isSub:true
  });
  var button=new Button({name:"移动商城"});
  button.add(one);
  button.add(two);
  return button;
}

//一级菜单
function initThirdStep(){
  var one=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"公司简介",
    url:"http://www.baidu.com",
    isSub:true
  });
  var two=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"联系我们",
    url:"http://www.baidu.com",
    isSub:true
  });
  var three=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"留言墙",
    url:"http://www.baidu.com",
    isSub:true
  });
  var four=new Button({
    type:BUTTON_TYPE.VIEW,
    name:"我的订单",
    url:"http://www.baidu.com",
    isSub:true
  });
  var button=new Button({name:"我的服务"});
  button.add(one);
  button.add(two);
  button.add(three);
  button.add(four);
  return button;
}
