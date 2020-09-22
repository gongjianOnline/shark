<template>
  <div>
    <div class="head-wrapper">
      <div class="date-wrapper" @click="choiceFun">
        <div class="year">{{date.year}}</div>
        <div class="month">
          {{date.month}}
          <span class="tagging">月</span>
          <span class="icon">
            <van-icon name="arrow-down" />
          </span>
        </div>
      </div>

      <div class="overview-wrapper">
        <div class="border"></div>
        <div class="income">
          <div class="title">{{state==='-'?'总支出':'总收入'}}</div>
          <div class="price">{{Income.monthIncome}}</div>
        </div>
        <div class="expenditure">
          <div class="title">{{state==='-'?'平均每日支出':'平均每日收入'}}</div>
          <div class="price">{{Income.averageIncome}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import settle from "../../lib/settleAccounts";
  import Vue from 'vue';
  import { Icon } from 'vant';

  Vue.use(Icon);
  export default {
    name: "overview",
    data(){
      return{
        Income:{},
      }
    },
    props:{
      date:{
        default: {}
      },
      state:{
        default: '-'
      }
    },
    watch:{
      state(newVal,oldVal){
        this.getRecord(this.date,newVal)
      },
      date(newVal,oldVal){
        this.getRecord(newVal,this.state)
      }
    },
    mounted() {
      this.getRecord(this.date,this.state)
    },
    methods:{
      getRecord(date,state){
        let data = settle.totalRecord(date,state);
        console.log("回显结果");
        console.log(data);
        this.Income = data;
      },
      choiceFun(){
        this.$emit("choiceFun",true);
      },



    }

  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  @bacolor:#1989fa;
  @titleColor:#fafdfd;
  @dateColor:#fafdfd;
  .head-wrapper{
    background: @bacolor;
    display: flex;
    > .date-wrapper{
      width: 30%;
      padding: 10px 0;
      > .year{
        color:@titleColor;
        font-size: 16px;
      }
      > .month{
        font-size: 24px;
        color:@dateColor;
        > .tagging{
          font-size: 18px;
        }
        > .icon{
          padding-left: 4px;
        }
        @{deep} .van-icon{
          top: 2px;
          font-size: 16px;
        }
      }
    }
    > .overview-wrapper{
      width: 70%;
      display: flex;
      > .border{
        width: 1px;
        height: 50px;
        border-left: 2px solid @dateColor;;
        margin-top: 5px;
      }
      > .income{
        width: 50%;
        padding: 10px 0;
        > .title{
          color:@titleColor;
          font-size: 16px;
        }
        > .price{
          color:@dateColor;
          font-size: 24px;
        }
      }
      > .expenditure{
        width: 50%;
        padding: 10px 0;
        > .title{
          color:@titleColor;
          font-size: 16px;
        }
        > .price{
          color:@dateColor;
          font-size: 24px;
        }
      }
    }
  }


</style>