<template>
  <div>
    <div v-if="isAlert" class="isAlert-wrapper">
      <div class="explain">
        <img :src="require('../assets/img/alter.png')" alt="" class="img">
        <div class="alter-title">温馨提示</div>
        <div class="alter-content">
          为了更好的体验,请用手机或浏览器F12模拟移动端浏览此项目
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "isAlert.vue",
    data(){
      return{
        isAlert:true,
        screenWidth:null,
      }
    },
    created() {
      window.addEventListener('resize',()=>{
        this.screenWidth = document.body.offsetWidth;
      })
    },
    watch:{
      screenWidth(newVal,oldVal){
        if(newVal < 500){
          this.isAlert = false
        }
      }
    },
    mounted() {
      //获得浏览设备是否是移动端
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.isAlert = false
      }else{
        this.isAlert = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .isAlert-wrapper{
    background: rgba(0,0,0,0.2);
    color: #fff;
    width: 414px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    > .explain{
      width: 70%;
      border-radius: 10px;
      position: relative;
      > .img{
        height: 100%;
        width: 100%;
      }
      > .alter-title{
        position: absolute;
        top: 45%;
        left: 70%-50%;
        font-size: 30px;
        letter-spacing:20px;
        font-weight: bold;
        color: rgba(255,255,255,1);
      }
      > .alter-content{
        position: absolute;
        bottom: 15%;
        color: #606266;
        line-height: 30px;
        padding: 0 10px;
      }
    }
  }
</style>