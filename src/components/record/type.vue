<template>
  <div class="head-container">
    <div class="center">
      <span class="center-type" :class="type === '-'?'selected':''" @click="typeChange('-')">支出</span>
      <span class="center-type" :class="type === '+'?'selected':''" @click="typeChange('+')">收入</span>
    </div>
  </div>
</template>

<script lang="js">
  export default {
    name: "type",
    data(){
      return{
        type:"-"
      }
    },
    methods:{
      typeChange(type){
        this.type = type;
        if(type === '-'){
          this.$emit("updateType",'-')
        }else{
          this.$emit("updateType",'+')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .head-container{
    background: #453300;
    color: #e0dbd2;
    font-size: 24px;
    > .center{
      display: inline-block;
      >.center-type{
        display: inline-block;
        padding: 10px 24px;
      }
      >.selected{
        color: white;
        position: relative;
      }
      >.selected::before{
        content: "";
        border-bottom: 3px solid white;
        position: absolute;
        bottom: 5px;
        left: 0px;
        width: 100%;
        height: 2px;
      }
    }
  }
</style>