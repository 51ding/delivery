<template>
  <div>
    <sticky
      scroll-box="vux_view_box_body"
      ref="sticky"
      :offset="46"
      :check-sticky-support="false"
      :disabled="disabled">
      <tab  :line-width="2">
        <tab-item selected>我的地址</tab-item>
        <tab-item>常用联系人</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div><h1>fdsfddfsd</h1></div>
        </swiper-item>
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div><h1>fdsfddfsd</h1></div>
        </swiper-item>
      </swiper>
    </sticky>
  </div>
</template>

<script>
  export default {
    name: "Address",
    data(){
      return {
        disabled:true,
        index:1

      }
    }
  }
</script>

<style scoped>

</style>
