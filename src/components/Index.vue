<template>
  <div>
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
              <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
              <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <cell-box is-link>
        <flexbox>
          <flexbox-item :span="3/16">
            <div class="typelogo1">收</div>
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
              <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
              <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>

    <popup v-model="showPopup" style="background-color: white;height:400rem;overflow: scroll;position: relative;" class="checker-popup">
      <x-header @header-background-color="'#009cff'"
                style="position: absolute;left: 0;top: 0;right: 0;z-index: 999;"></x-header>
      <div style="margin-top: 41px">
        <swipeout>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <cell>
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <cell>
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <cell>
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <cell>
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <cell>
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <cell>
                <flexbox>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.name}}</p>
                  </flexbox-item>
                  <flexbox-item style="font-size: 1.2rem;">
                    <p>{{sendInfo.phone}}</p>
                  </flexbox-item>
                </flexbox>

                <flexbox orient="vertical" :gutter="0" style="margin-top: 0.5rem;">
                  <flexbox-item><p style="color: #999;">{{sendInfo.address}}</p></flexbox-item>
                  <flexbox-item><p style="color: #999;">{{sendInfo.detail}}</p></flexbox-item>
                </flexbox>
              </cell>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </popup>

    <group>
      <popup-picker title="物品类型"
                    :data="thingType"
                    v-model="selectedThingType"
                    placeholder="请选择物品类型">
      </popup-picker>
      <x-number title="重量(kg)" :fillable="true" :value="weight"></x-number>
      <popup-picker title="付款方式"
                    :data="payMethod"
                    v-model="selectedpayMethod"
                    placeholder="请选择付款方式">
      </popup-picker>
      <cell title="费用估算" :value="total">
        <div>
          <span style="color: red;margin-right: 15px">{{total}}</span>元
        </div>
      </cell>
      <x-switch title="我同意快件运单契约条款" v-model="isagree"></x-switch>
    </group>
    <x-button style="margin-top: 15px;" @click.native="submit" type="primary" :disabled="!isagree">提交</x-button>
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


</style>

<script>
  import {Panel, Group, Radio} from 'vux'

  export default {
    components: {
      Panel,
      Group,
      Radio
    },
    methods: {
      onItemClick() {
        this.showPopup = false
      },
      submit() {
        alert("提交成功！");
      }
    },
    data() {
      return {
        type: '5',
        sendInfo: {
          name: "侯晗彬",
          phone: "18801410502",
          address: "北京市海淀区西二旗东路",
          detail: "北京市海淀区西二旗东路北京市海淀区西二旗东"
        },
        thingType: [["文件", "数码产品", "生活用品", "服饰", "食品", "其他"]],
        selectedThingType: [],
        weight: 0,
        payMethod: [["寄件人付", "收件人付"]],
        selectedpayMethod: [],
        total: 0,
        isagree: false,
        showPopup: false
      }
    }
  }
</script>
