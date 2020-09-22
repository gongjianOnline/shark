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
  import account from "../../lib/accountData";
  export default {
    name: "menuList",
    components: {Clavier, Type},
    data(){
      return{
        payList:[],
        type:"",
        menuPitchIndex:"",
        isModeType:false,
      }
    },
    mounted() {
      this.updateMenu('-');
    },
    methods:{
      updateMenu(data){
        if(data === "-"){
          this.type = "defrayList"
        }else{
          this.type = "include"
        }
        this.$ajax({
          method:'get',
          url:`./recordApi/${this.type}.json`
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
      recordFun(price){
        let getData = account.getAccount();
        let newData = {
          name:this.menuPitchIndex.name,
          icon:this.menuPitchIndex.icon,
          type:this.type,
          price:price,
        };
        if(getData){
          let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
          //循环查找年月和日
          let monthArr = [];
          let days = [];
          getData.forEach((item,index)=>{
            monthArr = monthArr.concat(Object.keys(item));
            for(let key in item){
              days= days.concat(Object.keys(item[key]))
            }
          });
          if(monthArr.indexOf(`${DayDate[0]}-${DayDate[1]}`)>=0){
            //发现月
            if(days.indexOf(`${DayDate[2]}`)>=0){
              //发现日
              account.createMonthDay(newData)
            }else{
              //未发现日
              account.createMonthNoDay(newData);
            }
          }else{
            //未发现月份
            account.createMonth(newData)
          }
        }else{
          //创建账本
          account.createAccount(newData)
        }
      },
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