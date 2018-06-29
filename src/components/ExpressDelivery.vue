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
    <group title="快递信息">
      <x-input title="快递单号"
               v-model="express.no"
               placeholder="请输入快递单号"
      ></x-input>
      <popup-picker title="物品类型"
                    :data="thingType"
                    v-model="express.itemtype"
                    placeholder="请选择物品类型"></popup-picker>
      <popup-picker title="物品重量"
                    :data="weight"
                    v-model="express.weight"
                    placeholder="请选择物品重量"></popup-picker>
      <x-textarea :max="200" title="收件地址" name="detail" :rows="4" v-model="express.address" placeholder="请输入收件地址" :show-counter="false"></x-textarea>
      <cell title="费用">
        <div>
          <span style="color: red;margin-right: 15px">{{express.cost}}</span>元
        </div>
      </cell>
     </group>
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
          no: "",
          address:"",
          itemtype:[],
          weight:[],
          cost:0
        },
        thingType: [["文件", "数码产品", "生活用品", "服饰", "食品", "其他"]],
        weight:[["小件(重量低于5kg)", "大件(重量大于等于5kg)"]],
        user: {
          isverify: true
        }
      }
    },
    created(){
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
      }
    }
  }
</script>

<style scoped>

</style>
