<template>
  <div>
    <divider>我的订单</divider>
    <div style="padding:2px 5px 2px 5px;">
      <button-tab v-model="index">
        <button-tab-item>发快递</button-tab-item>
        <button-tab-item>收快递</button-tab-item>
      </button-tab>
    </div>
    <group v-if="index==0">

        <div v-for="(item,index) in send" style="border-bottom:1px solid #666666; ">
          <group>
            <form-preview header-label="实付金额"
                          :header-value="`¥${item.title}`"
                          :body-items="item.items"
            ></form-preview>
          </group>

        </div>
    </group>
    <group v-if="index!=0">
      <div v-for="(item,index) in receive" style="border-bottom:1px solid #666666; ">
        <group>
          <form-preview header-label="实付金额"
                        :header-value="`¥${item.title}`"
                        :body-items="item.items"
          ></form-preview>
        </group>

      </div>
    </group>
  </div>
</template>

<script>
  import {Divider} from 'vux'

  export default {
    components: {
      Divider
    },
    name: "Order",
    data() {
      return {
        index: 0,
        send: [],
        receive: []
      }
    },
    created() {
      this.axios.post("/order/all", {}).then(response => {
        var data=response.data.data;
        this.formatSend(data.order);
        this.formatReceive(data.express);
      })
    },
    methods: {
      formatSend(send) {
        send.forEach(r=>{
          var item={};
          item.title=r.cost;
          var name1={label:"发件人",value:r.send.name+"("+r.send.phone+")"};
          var detail1={label:"发货地址",value:r.send.detail};
          var name2={label:"收件人",value:r.receive.name+"("+r.send.phone+")"};
          var detail2={label:"收货地址",value:r.receive.detail};
          var merchant={label:"快递服务",value:r.merchant[0]};
          var itemtype={label:"快递类型",value:r.itemtype[0]};
          item.items=[name1,detail1,name2,detail2,merchant,itemtype];
          this.send.push(item);
        });
      },
      formatReceive(receive){
        receive.forEach(r=>{
          var item={};
          item.title=r.cost;
          var name={label:"联系人",value:r.name+"("+r.phone+")"};
          var township={label:"乡镇",value:r.township[0]};
          var newItem=[];
          r.items.forEach(t => {
            var no={label:"快递单号",value:t.no};
            var name={label:"快递名称",value:t.name};
            var address={label:"地址",value:t.address};
            newItem=newItem.concat([no,name,address]);
          })
          item.items=[name,township].concat(newItem);
          this.receive.push(item);
        });
      }
    }
  }
</script>

<style scoped>

</style>
