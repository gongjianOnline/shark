<template>
  <div>
    <div class="head-container">
      <div class="center">
        <span class="center-type selected">支出</span>
        <span class="center-type">收入</span>
      </div>
    </div>

    <div class="menu">
      <div class="menu-content" v-for="(item,index) in payList" :key="index">
        <div class="menu-ico">
          <!--     icon站位     -->
        </div>
        <div class="menu-title">
          {{item.name}}
        </div>
      </div>
    </div>



  </div>
</template>

<script lang="js">
  export default {
    name: "record",
    data(){
      return{
        payList:[
          {
            name:'餐饮'
          },
          {
            name:'购物'
          },
          {
            name:'日用'
          },
          {
            name:'交通'
          },
          {
            name:'蔬菜'
          },
          {
            name:'水果'
          },
          {
            name:'零食'
          },
          {
            name:'运动'
          }
        ]
      }
    },


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
  .menu{
    border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    >.menu-content{
      width: 25%;
      /*border: 1px solid red;*/
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      >.menu-ico{
        width: 69px;
        height: 69px;
        border-radius: 50%;
        background: #f5f5f5;
      }
      >.menu-title{

      }
    }

  }
</style>