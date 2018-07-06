<template>
  <div>
    <alert v-model="isalerthowErrorAlert" title="提示">{{alerterrinfo}}</alert>
    <div style="padding-bottom:100px ;">
      <cell v-if="!user.isverify" title="请先完成手机号认证。点击立即认证>>"
            style="background-color: #f6e1c6;color: #f55a28;"
            value-align="left"
            @click.native="verify">
        <icon type="warn" solt="icon"></icon>
      </cell>
      <group title="联系人信息">
        <x-input title="姓名"
                 name="username"
                 v-model="express.name"
                 placeholder="请输入姓名"
                 is-type="china-name"></x-input>
        <x-input title="联系方式"
                 name="mobile"
                 v-model="express.phone"
                 placeholder="请输入手机号码"
                 keyboard="number" is-type="china-mobile"></x-input>
        <popup-picker title="乡镇"
                      :data="township"
                      v-model="express.township"
                      placeholder="请选择乡镇"
                      :popup-style="style"></popup-picker>
      </group>
      <group title="快递信息(最多只能添加三件)">
        <cell title="添加快递" @click.native="addPopItem">
          <x-icon type="ios-plus" class="cell-x-icon"></x-icon>
        </cell>

        <group v-for="(item,index) in items"
               :key="index">
          <cell
            :title="`订单${index+1}`"
            is-link
            :border-intent="false"
            :arrow-direction="item.isarrow? 'up':'down'"
            @click.native="item.isarrow=!item.isarrow"></cell>

          <template v-if="item.isarrow">
            <cell-form-preview
              :border-intent="false" :list="item.items"
            ></cell-form-preview>
            <flexbox>
              <flexbox-item style="padding:0 0 0 5px">
                <x-button @click.native="onButtonClick('fav',index)" type="primary">编辑</x-button>
              </flexbox-item>
              <flexbox-item style="padding:0 5px">
                <x-button @click.native="onButtonClick('delete',index)" type="warn">删除</x-button>
              </flexbox-item>
            </flexbox>
          </template>

        </group>
      </group>
      <div>
        <x-dialog :show.sync="showToast">
          <group title="快递信息">
            <transition name="fade">
              <div v-if="ishowErrorAlert"
                   style="color:red;font-size: 17px;text-align: left;padding-left: 15px;vertical-align: middle;height: 30px;line-height: 30px;">
                <icon style="height: 30px;line-height: 30px;" type="warn"></icon>
                {{errinfo}}
              </div>
            </transition>
            <x-input title="快递单号"
                     v-model="item.no"
                     placeholder="请输入快递单号" placeholder-align="right" style="text-align: left"></x-input>
            <x-input title="快递名称"
                     v-model="item.name"
                     placeholder="请输入快递名称" placeholder-align="right" style="text-align: left"></x-input>
            <popup-picker title="物品类型"
                          :data="thingType"
                          v-model="item.itemtype"
                          placeholder="请选择物品类型"
                          :popup-style="style"></popup-picker>
            <popup-picker title="物品重量"
                          :data="weight"
                          v-model="item.weight"
                          placeholder="请选择物品重量"
                          :popup-style="style"></popup-picker>
            <x-textarea :max="200" title="收件地址" name="detail" placeholder-align="right" style="text-align: left"
                        :rows="4"
                        v-model="item.address" placeholder="请输入收件地址"
                        :show-counter="false"></x-textarea>
            <flexbox>
              <flexbox-item style="padding: 5px;">
                <x-button type="primary" @click.native="addItem">保存</x-button>
              </flexbox-item>
              <flexbox-item style="padding: 5px;">
                <x-button type="warn" @click.native="closeItemForm">取消</x-button>
              </flexbox-item>
            </flexbox>
          </group>
        </x-dialog>
      </div>
    </div>
    <group style="position: fixed;left: 0;right: 0;bottom: 0;">
      <cell title="费用">
        <div>
          <span style="color: red;margin-right: 15px">{{express.cost}}</span>元
        </div>
      </cell>
      <x-button type="primary" @click.native="pay">下单</x-button>
    </group>
  </div>
</template>

<script>

  export default {
    name: "ExpressDelivery",
    data() {
      return {
        express: {
          name: "",
          phone: "",
          items: [],
          cost: 0
        },
        thingType: [["文件", "数码产品", "生活用品", "服饰", "食品", "其他"]],
        weight: [["小件(重量低于5kg)", "大件(重量大于等于5kg)"]],
        user: {
          isverify: true
        },
        showToast: false,
        item: {
          no: "",
          weight: [],
          itemtype: [],
          address: "",
          isadd: true,
          name:""
        },
        style: {
          zIndex: 5555,
          height: "300px"
        },
        ishowErrorAlert: false,
        errinfo: "",
        items: [],
        buttons1: [{
          style: 'default',
          text: '编辑'
        }, {
          style: 'primary',
          text: "删除",
        }],
        currentIndex: -1,
        isalerthowErrorAlert: false,
        alerterrinfo: "",
        township:[["汉源镇", "长道镇", "何坝镇", "姜席镇", "石峡镇", "洛峪镇", "马元镇", "大桥镇", "西峪镇"]]
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        this.axios.post("/user/get", {}).then(response => {
          var user = response.data.data;
          this.user = user;
        });
      },
      verify() {
        this.$router.push('/verify');
      },
      addPopItem() {
        if (this.express.items.length >= 3) {
          this.isalerthowErrorAlert = true;
          this.alerterrinfo = "一个订单最多只能添加三个快递！";
          return;
        }
        this.showToast = true;
      },
      closeItemForm() {
        this.clearItem();
        this.showToast = false;
      },
      alert(msg) {
        this.errinfo = msg;
        this.ishowErrorAlert = true;
      },
      addItem() {
        var isvaliedate = this.valiadateItem();
        if (!isvaliedate) return;
        /*是新加的数据*/
        if (this.item.isadd) {
          this.express.items.push(this.item);
          this.formateItem(this.item);
          this.showToast = false;
        }
        else {
          this.showToast = false;
          this.formateItem(this.item);
        }
        this.clearItem();
        this.setTotal();
      },
      clearItem() {
        this.ishowErrorAlert = false;
        this.errinfo = "";
        this.item = {
          no: "",
          weight: [],
          itemtype: [],
          address: "",
          isadd: true,
          name:""
        }
      },
      valiadateItem() {
        var isvalidate = false;
        var msg = "";
        if (!this.item.no)
          msg = "请输入快递单号!";
        else if (this.item.itemtype.length == 0)
          msg = "请选择物品类型!";
        else if (this.item.weight.length == 0)
          msg = "请选择物品重量!";
        else if (!this.item.address)
          msg = "请输入收件地址!";
        else {
          isvalidate = true;
        }
        if (!isvalidate) this.alert(msg);
        return isvalidate;
      },
      onButtonClick(type, identifier) {
        /*编辑*/
        if (type == "fav") {
          this.item = this.express.items[identifier];
          this.item.isadd = false;
          this.showToast = true;
          this.currentIndex = identifier;
        }
        /*删除*/
        else {
          this.express.items.splice(identifier, 1);
          this.items.splice(identifier, 1);
          this.clearItem();
          this.setTotal();
        }
      },
      formateItem(item) {
        var no = {label: "快递单号", value: item.no};
        var name={label:"快递名称",value:item.name};
        var weight = {label: "物品重量", value: item.weight[0]};
        var itemtype = {label: "物品类型", value: item.itemtype[0]};
        var address = {label: "收件地址", value: item.address};
        var newItem = {isarrow: item.isarrow, items: [no, name,weight, itemtype, address]};
        if (item.isadd) {
          this.items.push(newItem);
        }
        else {
          this.items[this.currentIndex].isarrow = true;
          this.items[this.currentIndex].items = [no, weight, itemtype, address];
        }
      },
      showalert(msg) {
        this.isalerthowErrorAlert = true;
        this.alerterrinfo = msg;
      },
      validatePhone(phone) {
        var expression = /^0?(13[0-9]|15[012356789]|18[012346789]|14[57]|17[678]|170[059]|14[57]|166|19[89])[0-9]{8}$/;
        var reg = new RegExp(expression);
        if (!reg.test(phone)) {
          return false;
        }
        return true;
      },
      pay() {
        var isValidate = false;
        if (!this.express.name)
          this.showalert("请输入联系人姓名！");
        else if (!this.validatePhone(this.express.phone)) {
          this.showalert("无效的电话号码！");
          return false;
        }
        else if (this.express.items.length == 0)
          this.showalert("请至少添加添加一条快递信息！");
        else
          isValidate = true;
        if (isValidate){
          this.axios.post("/order/exress/save",this.express).then(response => {
            var result = response.data;
            var data = result.data;
            if (result.errcode == 0 && data.unifiedorder && data.unifiedorder.return_code === "SUCCESS" && data.unifiedorder.return_msg === "OK") {
              this.topay(data.unifiedorder);
            }
          });
        }
        else return;
      },
      topay(params){
        var _this = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": params.appid,
            "timeStamp": params.timeStamp,
            "nonceStr": params.nonceStr,
            "package": params.packageStr,
            "signType": "MD5",
            "paySign": params.paySign
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              _this.$router.push('/order/' + params.param.out_trade_no);
            }
            else {
              _this.warning("支付失败");
            }
          }
        )
      },
      setTotal(){
        console.log(this.express);
        var total=0;
        this.express.items.forEach(r=>{
          total+=(r.weight[0]=="小件(重量低于5kg)" ? 3 :5);
        });
        this.express.cost=total;
      }
    }
  }
</script>

<style lang="less" scoped>
  .vux-x-icon {
    fill: #F70968;
  }

  .cell-x-icon {
    display: block;
    fill: green;
  }

  @import '~vux/src/styles/close';

  .dialog-demo {
    .weui-dialog {
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .weui-form-preview__hd {
    display: none;
  }

</style>
