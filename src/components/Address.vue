<template>
  <div style="height:100%">
    <x-header style="position: fixed;top: 0;left: 0;right: 0;z-index: 9999;">地址管理</x-header>
    <tab  :line-width="2"  v-model="index" style="margin-top: 40px;">
      <tab-item selected>我的地址</tab-item>
      <tab-item>常用联系人</tab-item>
    </tab>
    <swiper v-model="index"  height="600px"  :show-dots="false">
      <swiper-item  >
        <div>
          <group  title="个人信息" label-width="4.5em" label-margin-right="2em" label-align="left">
            <x-input title="姓名" name="username" placeholder="请填写真实姓名" is-type="china-name"></x-input>
            <x-input title="联系方式" placeholder="输入手机号或电话号码" is-type="china-mobile"></x-input>
            <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
            <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="5"></x-textarea>

          </group>
          <group title="地址标签">
            <radio fill-mode fill-label="其他" :selected-label-style="{color: '#09BB07'}" fill-placeholder="填写其他的哦" :options="addressSendTag" ></radio>
            <x-switch title="设为默认寄件人地址"></x-switch>
          </group>
        </div>
        <flexbox >
          <flexbox-item style="padding: 5px;">
            <x-button type="primary">保存</x-button>
          </flexbox-item>
          <flexbox-item style="padding: 5px;">
            <x-button type="warn">取消</x-button>
          </flexbox-item>
        </flexbox>
      </swiper-item>
      <swiper-item>
        <div>
          <group  title="个人信息" label-width="4.5em" label-margin-right="2em" label-align="left">
            <x-input title="姓名" name="username" placeholder="请填写真实姓名" is-type="china-name"></x-input>
            <x-input title="联系方式" placeholder="输入手机号或电话号码" is-type="china-mobile"></x-input>
            <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
            <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="5"></x-textarea>

          </group>
          <group title="地址标签">
            <radio fill-mode fill-label="其他" :selected-label-style="{color: '#09BB07'}" fill-placeholder="填写其他的哦" :options="addressReceiveTag" ></radio>
            <x-switch title="设为默认寄件人地址"></x-switch>
          </group>
        </div>
        <flexbox >
          <flexbox-item style="padding: 5px;">
            <x-button type="primary">保存</x-button>
          </flexbox-item>
          <flexbox-item style="padding: 5px;">
            <x-button type="warn">取消</x-button>
          </flexbox-item>
        </flexbox>
      </swiper-item>
    </swiper>
  </div>
</template>


<script>
	import {ChinaAddressData} from "vux";

  export default {
    name: "Address",
    data(){
      return {
        disabled:true,
        index:0,
				addressData: ChinaAddressData,
				addressValue: ['北京市', '市辖区', '东城区'],
				addressSendTag:["公司","家庭"],
        addressReceiveTag:["朋友","客户"]
      }
    }
  }
</script>

<style scoped>

</style>
