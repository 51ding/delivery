<template>
    <div>
      <swipeout>
        <swipeout-item :threshold=".5" underlay-color="#ccc">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">收藏</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">删除</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-tb">
            额为其
          </div>
        </swipeout-item>
      </swipeout>
    </div>
</template>

<script>
    export default {
        name: "Test"
    }
</script>

<style scoped>

</style>
