<template>
  <div>
    <group style="text-align: center">
      <icon type="success" is-msg ></icon>
      <div class="pay_success"><h4>支付成功</h4></div>
      <cell-form-preview :list="list"></cell-form-preview>
      <x-button type="primary" link="/" >查看订单详情</x-button>
      <x-button type="default" link="/" >继续下单</x-button>
    </group>


  </div>
</template>

<script>
  export default {
    name: "PaySuccess",
    data(){
      return {
        order:{},
        desc:"",
        list:[]
      }
    },
    mounted(){
      var no = this.$route.params.no;
      this.getDetail(no);
    },
    methods:{
      getDetail(no){
        this.axios.post("/order/detail",{no:no})
          .then(response => {
            var result=response.data;
            if(result.errcode==0){
              this.order=result.data;
              this.formatData(result.data);
            }
          })
      },
      formatData(obj){
        var data=[];
        data.push({label:"订单号",value:obj.out_trade_no});
        data.push({label:"快递服务",value:obj.merchant[0]});
        data.push({label:"物品类型",value:obj.itemtype[0]})
        data.push({label:"重量",value:obj.weight+" kg"})
        data.push({label:"付款金额",value:obj.total_fee/100+" 元"})
        this.list=data;
      }
    }
  }
</script>

<style scoped>
  .pay_success{
    text-align: center;
    margin-top:1rem;
    color: #666666;
    margin-bottom: 1.5rem;
  }
</style>
