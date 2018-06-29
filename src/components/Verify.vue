<template>
  <div>
    <loading :show="showloading" text="加载中"></loading>
    <alert v-model="ishowErrorAlert" title="提示">{{errinfo}}</alert>
    <x-header :left-options="{backText: '返回'}"
              style="background-color: #637f9bfa">手机认证</x-header>
    <group>
      <x-input title="手机号码" v-model="info.phone" name="mobile" placeholder="请输入手机号码" keyboard="number"
               is-type="china-mobile"></x-input>
    </group>
    <group>
      <x-input title="发送验证码" v-model="code" class="weui-vcode">
        <x-button slot="right" :disabled="disabled" type="primary" mini @click.native="sendMessage">{{buttonContent}}
        </x-button>
      </x-input>
    </group>
    <group>
      <x-button type="primary" @click.native="verify">认证</x-button>
    </group>
  </div>
</template>

<script>
  export default {
    name: "Verify",
    data() {
      return {
        info: {
          phone: ""
        },
        buttonContent: "发送验证码",
        disabled: false,
        code: "",
        ishowErrorAlert: false,
        errinfo: "",
        showloading: false
      }
    },
    methods: {
      sendMessage() {
        var isvalidate = this.validatePhone();
        if(!isvalidate) return;
        this.sendMessageRequest();
      },
      validatePhone() {
        var expression = /^0?(13[0-9]|15[012356789]|18[012346789]|14[57]|17[678]|170[059]|14[57]|166|19[89])[0-9]{8}$/;
        var reg = new RegExp(expression);
        if (!reg.test(this.info.phone)) {
          this.alert("无效的电话号码！");
          return false;
        }
        return true;
      },
      controlButton() {
        var total = 160;
        this.disabled = true;
        var intername = setInterval(() => {
          if (total == 0) {
            this.buttonContent = "重新发送";
            this.disabled = false;
            clearInterval(intername);
          }
          else {
            this.buttonContent = "请在" + (total--) + "秒内输入";
          }
        }, 1000)
      },
      sendMessageRequest() {
        this.axios.post("/user/sms/send", this.info).then(response => {
          var data = response.data;
          if (data.errcode == 0) {
            this.controlButton();
          }
          else{
            this.alert(data.errmsg);
          }

        })
      },
      verify() {
        var isvalidate = this.validatePhone();
        if(!isvalidate) return;
        if (!this.code) {
          this.ishowErrorAlert = true;
          this.errinfo = "请输入验证码";
          return;
        }
        this.showloading = true;
        this.axios.post("/user/sms/verify", {code: this.code,phone:this.info.phone}).then(response => {
          this.showloading=false;
          var data = response.data;
          if (data.errcode == -1) {
            this.alert(data.errmsg);

          } else {
            this.$router.push("/");
          }
        });
      },
      alert(msg) {
        this.ishowErrorAlert = true;
        this.errinfo = msg;
      }
    }
  }
</script>

<style scoped>

</style>
