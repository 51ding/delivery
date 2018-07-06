<template>
  <div>
    <loading :show="showloading" text="加载中"></loading>
    <alert v-model="ishowErrorAlert" title="提示">{{errinfo}}</alert>
    <confirm v-model="showconfirm"
             title="操作提示"
             @on-confirm="comfirmDoSomething(true)"
             @on-cancel="comfirmDoSomething(false)">
      <p style="text-align:center;">是否确认删除?</p>
    </confirm>
    <cell v-if="!user.isverify" title="请先完成手机号认证。点击立即认证>>"
          style="background-color: #f6e1c6;color: #f55a28;"
          value-align="left"
          @click.native="verify">
      <icon type="warn" solt="icon"></icon>
    </cell>
    <group>
      <cell-box is-link @click.native="showPopup=true">
        <flexbox>
          <flexbox-item :span="3/16">
            <div class="typelogo">寄</div>
          </flexbox-item>
          <flexbox-item>
            <flexbox>
              <flexbox-item style="font-size: 1.2rem;">
                <p>{{sendInfo.name}}</p>
              </flexbox-item>
              <flexbox-item style="font-size: 1.2rem;">
                <p>{{sendInfo.phone}}</p>
              </flexbox-item>
            </flexbox>
            <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
              <flexbox-item><p style="color: #999;">{{sendInfo.street}}</p></flexbox-item>
              <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <cell-box is-link @click.native="showReceivePopup=true">
        <flexbox>
          <flexbox-item :span="3/16">
            <div class="typelogo1">收</div>
          </flexbox-item>
          <flexbox-item>
            <flexbox>
              <flexbox-item style="font-size: 1.2rem;">
                <p>{{receiveInfo.name}}</p>
              </flexbox-item>
              <flexbox-item style="font-size: 1.2rem;">
                <p>{{receiveInfo.phone}}</p>
              </flexbox-item>
            </flexbox>

            <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
              <flexbox-item><p style="color: #999;">{{receiveInfo.street}}</p></flexbox-item>
              <flexbox-item><p style="color: #999;">{{receiveInfo.detail}}</p></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>
    <popup v-model="showPopup" style="background-color: white;height:500px;" class="checker-popup">
      <x-header @header-background-color="'#009cff'"
                style="position: fixed;left: 0;right: 0;bottom:460px;z-index: 99999;"
                :right-options="{showMore: true}" @on-click-more="showMenus = true"
                @on-click-back="onItemClick(true)"
                :left-options="{preventGoBack:true}">
        <div v-transfer-dom>
          <actionsheet @on-click-menu="rightHeaderClick" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
        </div>
      </x-header>
      <div style="margin-top: 41px">
        <swipeout>
          <swipeout-item transition-mode="follow" v-for="item in sendAddressList"
                         v-bind:key="item._id">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav',item._id)" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete',item._id)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" style="padding: 0;">
              <cell value-align="left" style="border-bottom: 1px solid #c9c9c9;"
                    @click.native="setDefault(item._id,true)">
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p style="color: black">{{item.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p style="color: black;">{{item.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{item.street}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{item.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>

        </swipeout>
      </div>
    </popup>
    <popup v-model="showReceivePopup" style="background-color: white;height:500px;" class="checker-popup">
      <x-header @header-background-color="'#009cff'"
                style="position: fixed;left: 0;right: 0;bottom:460px;z-index: 99999;"
                :right-options="{showMore: true}" @on-click-more="showMenus2 = true"
                @on-click-back="onItemClick(false)"
                :left-options="{preventGoBack:true}">
        <div v-transfer-dom>
          <actionsheet @on-click-menu="rightHeader2Click" :menus="menus" v-model="showMenus2" show-cancel></actionsheet>
        </div>
      </x-header>
      <div style="margin-top: 41px">
        <swipeout>
          <swipeout-item transition-mode="follow"
                         v-for="item in receiveAddresslist"
                         v-bind:key="item._id"
          >
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav',item._id)" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete',item._id)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" style="padding: 0;">
              <cell value-align="left" style="border-bottom: 1px solid #c9c9c9;"
                    @click.native="setDefault(item._id,false)">
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p style="color: black">{{item.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p style="color: black;">{{item.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{item.street}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{item.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>

        </swipeout>
      </div>
    </popup>
    <group>
      <popup-picker title="快递服务"
                    :data="merchants"
                    v-model="order.merchant"
                    placeholder="请选择快递服务">
      </popup-picker>
      <popup-picker title="物品类型"
                    :data="thingType"
                    v-model="order.itemtype"
                    placeholder="请选择物品类型">
      </popup-picker>
      <x-number title="重量(kg)" :fillable="true" v-model="order.weight"
                :value="order.weight"
                @on-change="weightChange"
                :min="0"
      ></x-number>
      <cell title="费用估算">
        <div>
          <span style="color: red;margin-right: 15px">{{order.cost}}</span>元
        </div>
      </cell>
      <x-switch title="我同意快件运单契约条款" v-model="isagree"></x-switch>
    </group>
    <x-button style="margin-top: 15px;" @click.native="submit" type="primary" :disabled="!isagree">下单</x-button>
  </div>
</template>

<style scoped>
  .typelogo {
    background-color: #40c48a;
    text-align: center;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    line-height: 3.6rem;
    color: white;
    font-weight: 200;
    font-size: 2rem;
    padding: 0;
  }

  .typelogo1 {
    background-color: #9d9dff;
    text-align: center;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    line-height: 3.6rem;
    color: white;
    font-weight: 200;
    font-size: 2rem;
    padding: 0;
  }

  .verify {
    padding: 10px 5px 0 5px;
    color: red;
  }


</style>

<script>
  import {Panel, Group, Radio} from 'vux'
  import {XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Panel,
      Group,
      Radio,
      Actionsheet
    },
    created() {
      this.showloading = true;
      this.getUserInfo();
      /* this.getDefaultAddress();
       this.getAddressList();*/
    },
    methods: {
      onItemClick(issend) {
        if (issend) this.showPopup = false
        else this.showReceivePopup = false;

      },
      submit() {
        this.saveOrder();
      },
      rightHeaderClick(menuKey, menuItem) {
        if (menuItem == this.menus.menu1) {
          this.$router.push('/address/1')
        }
      },
      rightHeader2Click(menuKey, menuItem) {
        if (menuItem == this.menus.menu1) {
          this.$router.push('/address/2')
        }
      },
      getDefaultAddress() {
        this.axios.post("/delivery/address/default", {})
          .then(response => {
            var data = response.data;
            if (data.errcode == 0 && data.data.length > 0) {
              var sendInfo = data.data.find(r => r.ismine == true);
              if (sendInfo)
                sendInfo.street = sendInfo.street.join("-");
              var receiveInfo = data.data.find(r => r.ismine == false);
              if (receiveInfo)
                receiveInfo.street = receiveInfo.street.join("-");
              this.sendInfo = sendInfo || {};
              this.receiveInfo = receiveInfo || {};
              this.showloading = false;
            }
            else {
              this.sendInfo = {};
              this.receiveInfo = {};
            }
          })
      },
      getAddressList() {
        this.showloading = true;
        this.axios.post("/delivery/address/get", {}).then(response => {
          var data = response.data;
          var sendAddressList = data.data.filter(r => r.ismine == true);
          sendAddressList.forEach(r => r.street = r.street.join("-"));
          var receiveAddresslist = data.data.filter(r => r.ismine == false);
          receiveAddresslist.forEach(r => r.street = r.street.join("-"));
          this.sendAddressList = sendAddressList;
          this.receiveAddresslist = receiveAddresslist;
          this.showloading = false;
        })
      },
      onButtonClick(type, id) {
        if (type == "delete") {
          this.showconfirm = true;
          this.deleteid = id;
        }
        else {
          this.$router.push('/address/' + id);
        }
      },
      deleteAddressById(id) {
        this.axios.post("/delivery/address/delete", {id: id}).then(response => {
          this.getAddressList();
          this.getDefaultAddress();
        })
      },
      setDefault(id, ismine) {
        this.axios.post("/delivery/address/setdefault", {id: id, ismine: ismine})
          .then(response => {
            this.getAddressList();
            this.getDefaultAddress();
            this.showPopup = false;
            this.showReceivePopup = false;
          });
      },
      weightChange(val) {
        /*this.order.cost = val * 10;*/
      },
      saveOrder() {
        var isvalidate=this.validate();
        if(!isvalidate) return;
        this.order.send = this.sendInfo._id;
        this.order.receive = this.receiveInfo._id;
        this.axios.post("/order/save", this.order)
          .then(response => {
            var result = response.data;
            var data = result.data;
            if (result.errcode == 0 && data.unifiedorder && data.unifiedorder.return_code === "SUCCESS" && data.unifiedorder.return_msg === "OK") {
              this.pay(data.unifiedorder);
            }
          })
      },
      validate() {
        var isvalidate=false;
        if (!this.sendInfo._id)
          this.warning("请选择发货地址！");
        else if (!this.receiveInfo._id)
          this.warning("请选择收货地址！");
        else if (this.order.merchant.length == 0)
          this.warning("请选择快递服务！");
        else if (this.order.itemtype.length == 0)
          this.warning("请选择物品类型！");
        else {
          isvalidate=true;
        }
        return isvalidate;
      },
      warning(msg) {
        this.errinfo = msg;
        this.ishowErrorAlert = true;
      },
      comfirmDoSomething(select) {
        if (select) {
          this.deleteAddressById(this.deleteid);
        }
        else
          this.deleteid = "";
      },
      pay(params) {
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
      getUserInfo() {
        this.axios.post("/user/get", {}).then(response => {
          var user = response.data.data;
          this.user = user;
          this.getDefaultAddress();
          this.getAddressList();
        });
      },
      verify() {
        this.$router.push('/verify');
      }
    },
    data() {
      return {
        type: '5',
        sendInfo: {},
        receiveInfo: {},
        thingType: [["文件", "数码产品", "生活用品", "服饰", "食品", "其他"]],
        merchants: [["顺丰快递", "中通快递", "申通快递", "圆通快递", "韵达快递"]],
        isagree: false,
        showPopup: false,
        showReceivePopup: false,
        showMenus: false,
        showMenus2: false,
        menus: {
          menu1: '新建地址'
        },
        sendAddressList: [],
        receiveAddresslist: [],
        showloading: true,
        order: {
          merchant: [],
          itemtype: [],
          weight: 0,
          cost: 13
        },
        errinfo: "",
        ishowErrorAlert: false,
        showconfirm: false,
        deleteid: "",
        user: {
          isverify: true
        }
      }
    }
  }
</script>
