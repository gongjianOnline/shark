<template>
  <div>
    <div class="fill-wrapper">
      <div>
        <img :src="require('../../assets/img/null.jpg')" alt="" class="fill-Img">
        <p class="fill-content">没有记录</p>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "seat.vue",
  }
</script>

<style lang="less" scoped>
  @iconColor:#606266;
  .fill-wrapper{
    height: 70vh;
    display: flex;
    align-items: center;
    .fill-Img{
      width: 60%;
    }
    .fill-content{
      font-size: 24px;
      color:@iconColor;
    }
  }
</style>