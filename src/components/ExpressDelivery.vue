<template>
  <div>
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
    </group>
    <group title="快递信息(最多只能添加三件)">
      <cell title="添加快递" @click.native="addPopItem">
        <x-icon type="ios-plus" class="cell-x-icon"></x-icon>
      </cell>
      <!--
      <cell title="费用">
        <div>
          <span style="color: red;margin-right: 15px">{{express.cost}}</span>元
        </div>
      </cell>-->
    </group>
    <div>
      <x-dialog :show.sync="showToast">
        <group title="快递信息">
          <transition name="fade">
            <div v-if="ishowErrorAlert" style="color:red;font-size: 17px;text-align: left;padding-left: 15px;vertical-align: middle;height: 30px;line-height: 30px;"> <icon style="height: 30px;line-height: 30px;" type="warn"></icon>{{errinfo}}</div>
          </transition>
          <x-input title="快递单号"
                   v-model="item.no"
                   placeholder="请输入快递单号" placeholder-align="right" style="text-align: left"></x-input>
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
          <x-textarea :max="200" title="收件地址" name="detail" placeholder-align="right" style="text-align: left" :rows="4"
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
    <group>
      <x-button type="primary">下单</x-button>
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
          address: ""
        },
        style: {
          zIndex: 5555,
          height: "300px"
        },
        ishowErrorAlert: false,
        errinfo: ""
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
          this.alert("一个订单最多只能添加三个快递！");
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
        var isvaliedate=this.valiadateItem();
        if(!isvaliedate) return;
        alert("保存陈功！");
        this.express.items.push(this.item);
        this.showToast = false;
        this.clearItem();
      },
      clearItem() {
        this.ishowErrorAlert=false;
        this.errinfo="";
        this.item = {
          no: "",
          weight: [],
          itemtype: [],
          address: ""
        }
      },
      valiadateItem(){
        var isvalidate=false;
        var msg="";
        if(!this.item.no)
          msg="请输入快递单号!";
        else if(this.item.itemtype.length==0)
          msg="请选择物品类型!";
        else if(this.item.weight.length==0)
          msg="请选择物品重量!";
        else if(!this.item.address)
          msg="请输入收件地址!";
        else{
          isvalidate=true;
        }
        if(!isvalidate) this.alert(msg);
        return isvalidate;
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

</style>
