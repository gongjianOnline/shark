<template>
  <div>
    <Type @updateType="updateMenu"/>
    <div class="menu">
      <div class="menu-content"
           v-for="(item,index) in payList"
           :key="index">
        <div class="menu-ico"
             @click="menuPitch(item)"
             :class="menuPitchIndex.name===item.name?'selected':''">
          <span class="icon iconfont"
                :class="menuPitchIndex.name===item.name?'selected':''"
                v-html="item.icon"></span>
        </div>
        <div class="menu-title">
          {{item.name}}
        </div>
      </div>
    </div>
    <Clavier :modeShow="isModeType"
             @numberPadsClose="numberPadsClose"
             @onBlurs="recordFun"/>
  </div>
</template>

<script lang="js">
  import Type from "./type";
  import Clavier from "./clavier";
  import dayjs from 'dayjs'
  export default {
    name: "menuList",
    components: {Clavier, Type},
    data(){
      return{
        payList:[],
        menuPitchIndex:"",
        isModeType:false,
      }
    },
    mounted() {
      this.updateMenu('-');
      console.log("打印时间")
      console.log(dayjs().format('YYYY-MM-DD'))
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
        this.menuPitchIndex = item;
        this.isModeType = true;
      },
      numberPadsClose(type){
        this.isModeType = type
      },
      recordFun(data){
        let getData = window.localStorage.get("account");
        let datas = [
          {
            "2020-9":{
              "20":[
                {
                  name:'购物',
                  state:"支出",
                  price:"200"
                }
              ]
            }
          }
        ];





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
        text-align: center;
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