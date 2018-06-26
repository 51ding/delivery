<template>
  <div style="height:100%">
    <x-header style="position: fixed;top: 0;left: 0;right: 0;z-index: 9999;">地址管理</x-header>
    <tab :line-width="2"  style="margin-top: 40px;">
      <tab-item  v-if="index==0">我的地址</tab-item>
      <tab-item  v-else>常用联系人</tab-item>
    </tab>
    <group v-if="index==0">
      <div>
        <group title="个人信息" label-width="4.5em" label-margin-right="2em" label-align="left">
          <x-input title="姓名" v-model="address.name" name="username" placeholder="请填写真实姓名"
                   is-type="china-name"></x-input>
          <x-input title="联系方式" v-model="address.phone" placeholder="输入手机号或电话号码" is-type="china-mobile"></x-input>
          <x-address title="地址选择" v-model="address.streetValue" @on-shadow-change="onaddressChange"
                     :list="addressData" value-text-align="left"
                     label-align="justify"></x-address>
          <x-textarea title="详细信息" v-model="address.detail" placeholder="请填写详细信息" :show-counter="false"
                      :rows="5"></x-textarea>

        </group>
        <group title="地址标签">
          <!-- <radio  :selected-label-style="{color: '#09BB07'}"  :options="addressSendTag" ></radio>-->
          <x-switch title="设为默认寄件人地址" v-model="address.isdefault"></x-switch>
        </group>
      </div>
      <flexbox>
        <flexbox-item style="padding: 5px;">
          <x-button type="primary" @click.native="addressSave(true)">保存</x-button>
        </flexbox-item>
        <flexbox-item style="padding: 5px;">
          <x-button type="warn">取消</x-button>
        </flexbox-item>
      </flexbox>
    </group>
    <group v-else>
      <div>
        <group title="个人信息" label-width="4.5em" label-margin-right="2em" label-align="left">
          <x-input title="姓名" name="username" v-model="contact.name" placeholder="请填写真实姓名"
                   is-type="china-name"></x-input>
          <x-input title="联系方式" v-model="contact.phone" placeholder="输入手机号或电话号码" is-type="china-mobile"></x-input>
          <x-address title="地址选择" v-model="contact.streetValue" @on-shadow-change="onContactChange"
                     :list="addressData" value-text-align="left"
                     label-align="justify"></x-address>
          <x-textarea title="详细信息" v-model="contact.detail" placeholder="请填写详细信息" :show-counter="false"
                      :rows="5"></x-textarea>

        </group>
        <group title="地址标签">
          <!-- <radio v-model="address.tag"  fill-label="其他" :selected-label-style="{color: '#09BB07'}" fill-placeholder="填写其他的哦" :options="addressReceiveTag" ></radio>-->
          <x-switch title="设为默认收件人地址" v-model="contact.isdefault"></x-switch>
        </group>
      </div>
      <flexbox>
        <flexbox-item style="padding: 5px;">
          <x-button type="primary" @click.native="addressSave(false)">保存</x-button>
        </flexbox-item>
        <flexbox-item style="padding: 5px;">
          <x-button type="warn">取消</x-button>
        </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>


<script>
  import {ChinaAddressData, ChinaAddressV4Data, Value2nameFilter as value2name} from "vux";

  export default {
    name: "Address",
    data() {
      return {
        disabled: true,
        index: 0,
        addressData: ChinaAddressV4Data,
        addressValue: ['北京市', '市辖区', '东城区'],
        addressSendTag: ["公司", "家庭"],
        addressReceiveTag: ["朋友", "客户"],
        address: {
          name: "",
          phone: "",
          street: [],
          streetValue: ["110000", "110100", "110101"],
          detail: "",
          ismine: false,
          isdefault: false
        },
        contact: {
          name: "",
          phone: "",
          street: [],
          streetValue: ["110000", "110100", "110101"],
          detail: "",
          ismine: false,
          isdefault: false
        },
        id: ""
      }
    },
    methods: {
      /* isMine是否保存的是我的地址 */
      addressSave: function (isMine) {
        if(this.id.toString().length != 1){
          this.update(isMine);
        }
        else{
          this.address.ismine = true;
          this.contact.ismine = false;
          var data = isMine ? this.address : this.contact;
          this.save(data);
        }
      },
      save(data) {
        this.axios.post("/delivery/address/save", data)
          .then(response => {
            if (response.data.errcode == 0) {
              this.$router.push('/');
            }
          })
      },
      update(isMine){
        var data= isMine ? this.address:this.contact;
        this.axios.post("/delivery/address/update", data)
          .then(response => {
            if (response.data.errcode == 0) {
              this.$router.push('/');
            }
          })
      },
      clearAddress() {
        this.address.name = "";
        this.address.phone = "";
        this.address.street = [];
        this.address.detail = "";
        this.address.ismine = false;
        this.address.isdefault = false;
      },
      getAddressById() {
        this.axios.post("").then(reponse => {
          var {data} = reponse;
        });
      },
      onaddressChange(ids, names) {
        this.address.street = names;
      },
      onContactChange(ids, names) {
        this.contact.street = names;
      }
    },
    mounted() {
      var id = this.$route.params.id;
      this.id = id;
      if(id==="1") {
        setTimeout(()=>{
          this.index=0;
        },1);
      }
      else if(id==="2"){
        setTimeout(()=>{
          this.index=1;
        },1);
      }
      else {
        this.axios.post("/delivery/address/getbyid", {id: id}).then(response => {
          var data = response.data.data;
          var ismine = data.ismine;
          if (ismine) {
            this.address = data;
            this.index = 0
          }
          else {
            this.contact = data;
            this.index = 1
          }

        });
      }
    }
  }
</script>

<style scoped>

</style>
