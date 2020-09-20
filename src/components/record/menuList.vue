<template>
  <div>
    <Type @updateType="updateMenu"/>
    <div class="menu">
      <div class="menu-content"
           v-for="(item,index) in payList"
           :key="index"
           @click="menuPitch(item)">
        <div class="menu-ico"
             :class="menuPitchIndex===item.name?'selected':''">
          <span class="icon iconfont"
                :class="menuPitchIndex===item.name?'selected':''"
                v-html="item.icon"></span>
        </div>
        <div class="menu-title">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import Type from "./type";
  export default {
    name: "menuList",
    components: {Type},
    data(){
      return{
        payList:[],
        menuPitchIndex:""
      }
    },
    mounted() {
      this.updateMenu('-')
    },
    methods:{
      updateMenu(data){
        let type = "";
        if(data === "-"){
          type = "defrayList"
        }else{
          type = "include"
        }
        this.$ajax({
          method:'get',
          url:`./recordApi/${type}.json`
        }).then((response)=>{
          this.payList = response.data.data
        })
      },
      menuPitch(item){
        this.menuPitchIndex = item.name;
      }
    }
  }
</script>

<style lang="less" scoped>
  .menu{
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    height: 80vh;
    scrollbar-width: none;
    /* for Chrome */
    &::-webkit-scrollbar {
      display: none;
    }
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
        > .iconfont{
          font-size: 32px;
          line-height: 69px;
        }
      }
      > .selected{
        background: #1989fa;
        color: white;
      }
      >.menu-title{

      }
    }

  }
</style>