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
        type:"",
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
        let getData = this.getAccount()
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
              console.log(days)
              this.createMonthDay(price)
            }else{
              //未发现日
              this.createMonthNoDay(price);
            }
          }else{
            //未发现月份
            this.createMonth(price)
          }
        }else{
          //创建账本
          this.createAccount(price)
        }
      },

      //创建本地账本
      createAccount(price){
        let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
        let data = [];
        data[0] = {};
        data[0][`${DayDate[0]}-${DayDate[1]}`] = {};
        data[0][`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`]=[];
        let dayData = {
          name:this.menuPitchIndex.name,
          icon:this.menuPitchIndex.icon,
          type:this.type,
          price:price,
        }
        data[0][`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`].push(dayData)
        this.preserveAccount(data)
      },
      //保存账本
      preserveAccount(data){
        window.localStorage.setItem('account',JSON.stringify(data))
      },
      //获取账本
      getAccount(){
        return JSON.parse(window.localStorage.getItem("account"));
      },

      //创建同月同日账本
      createMonthDay(price){
        let getData = this.getAccount();
        let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
        getData.forEach((time,index)=>{
          for(let key in time){
            if(key ===`${DayDate[0]}-${DayDate[1]}`){
              for(let ChildKey in time[key]){
                if(ChildKey === `${DayDate[2]}`){
                  let object = {
                    name:this.menuPitchIndex.name,
                    icon:this.menuPitchIndex.icon,
                    type:this.type,
                    price:price,
                  };
                  time[key][ChildKey].push(object)
                  this.preserveAccount(getData)
                }
              }
            }
          }
        })
      },
      //创建同月不同日账本
      createMonthNoDay(price){
        let getData = this.getAccount();
        let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
        getData.forEach((item,index)=>{
          for(let key in item){
            if(key === `${DayDate[0]}-${DayDate[1]}`){
              item[key][`${DayDate[2]}`] = []
              let dayData = {
                name:this.menuPitchIndex.name,
                icon:this.menuPitchIndex.icon,
                type:this.type,
                price:price,
              };
              item[key][`${DayDate[2]}`].push(dayData);
              this.preserveAccount(getData)
            }
          }
        })
      },
      //创建月
      createMonth(price){
        let getData = this.getAccount();
        let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
        let data = {};
        data[`${DayDate[0]}-${DayDate[1]}`] = {};
        data[`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`] = [];
        let dayData = {
          name:this.menuPitchIndex.name,
          icon:this.menuPitchIndex.icon,
          type:this.type,
          price:price,
        };
        data[`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`].push(dayData);
        getData.push(data);
        this.preserveAccount(getData);
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