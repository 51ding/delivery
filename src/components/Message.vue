<template>
  <div style="height: 100%;">
    <panel header="留言列表"
           :list="list" :type="type"
           @on-click-item="showMessagwDetial"
           style="margin-bottom: 35px"
    >

    </panel>
    <x-button type="primary" @click.native="setleaveMessage" class="message">我要留言</x-button>
    <x-dialog v-model="show" class="dialog-demo">
      <div class="img-box">
        <group>
          <x-textarea :title="nickname" :max="350" :readonly="true" v-model="desc" :show-counter="false" :height="350" :rows="8"
                      :cols="30"></x-textarea>
        </group>
      </div>
      <div @click="show=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
    <x-dialog v-model="showLeaveMessage" class="dialog-demo">
      <div class="img-box-content">
        <group title="留言板">
          <x-textarea v-model="messageContent" :max="200" :show-counter="true" :rows="9" autosize></x-textarea>
        </group>
        <flexbox>
          <flexbox-item style="padding: 8px;">
            <x-button type="primary" @click.native="saveLeaveMessage">保存</x-button>
          </flexbox-item>
          <flexbox-item style="padding:8px;">
            <x-button type="warn" @click.native="closeLeaveMessage">取消</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  export default {
    name: "Message",
    data() {
      return {
        type: '1',
        show: false,
        desc: "",
        nickname: "",
        showLeaveMessage: false,
        messageContent: "",
        list: []
      }
    },
    mounted() {
      this.getLeaveMessage();
    },
    methods: {
      showMessagwDetial(item) {
        this.show = true;
        this.desc = item.desc;
      },
      setleaveMessage() {
        this.showLeaveMessage = true;
      },
      closeLeaveMessage() {
        this.showLeaveMessage = false;
        this.messageContent = "";
      },
      saveLeaveMessage() {
        this.axios.post("/message/save", {
          desc: this.messageContent
        }).then(response => {
          this.getLeaveMessage();
          this.closeLeaveMessage();
        });
      },
      getLeaveMessage() {
        this.axios
          .get("/message/get")
          .then(response => {
            this.list=response.data.data;
          })

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/close';

  .message {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
  }

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
      height: 200px;
      overflow: hidden;
    }
    .img-box-content{
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
</style>
