/*
 1、自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。
 2、一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。
 3、创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，就会拉取一下菜单，
      如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。*/

/*菜单的按钮类型*/
const BUTTON_TYPE={
	CLICK:"click",
	VIEW:"view",
	SCANCODE_PUSH:"scancode_push",
	SCANCODE_WAITMSG:"scancode_waitmsg",
	PIC_SYSPHOTO:"pic_sysphoto",
	PIC_PHOTO_OR_ALBUM:"pic_photo_or_album",
	PIC_WEIXIN:"pic_weixin",
	LOCATION_SELECT:"location_select",
	MEDIA_ID:"media_id",
	VIEW_LIMITED:"view_limited"
}



/*一级菜单*/
function Button(option){
	if(!option) throw new Error("无法初始化按钮");
	if(!option.isSub) this["sub_button"]=[];
    if(option.type) this.type=option.type;
    if(option.name) this.name=option.name;
    if(option.url) this.url=option.url;
}

Button.prototype.add=function(subButton){
	if(!(subButton instanceof Button)) throw new Error("无效的按钮类型");
	if(this["sub_button"].length==5) return;
	this["sub_button"].push(subButton);
}


/*菜单类*/
function Menu(){
	this.button=[];
}



Menu.prototype.add=function(button){
	if(!(button instanceof Button))  throw Error("无效的按钮类型");
	this.button.push(button);
}


module.exports={Button,Menu,BUTTON_TYPE};

