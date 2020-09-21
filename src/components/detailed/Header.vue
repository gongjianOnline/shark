<template>
  <div>
    <div class="head-wrapper">
      <div class="date-wrapper">
        <div class="year">2020</div>
        <div class="month">
          9
          <span class="tagging">月</span>
          <span class="icon">
            <van-icon name="arrow-down" />
          </span>
        </div>
      </div>

      <div class="overview-wrapper">
        <div class="border"></div>
        <div class="income">
          <div class="title">收入</div>
          <div class="price">100.00</div>
        </div>
        <div class="expenditure">
          <div class="title">支出</div>
          <div class="price">100.00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import Vue from 'vue';
  import { Icon } from 'vant';
  Vue.use(Icon);
  export default {
    name: "Headers"
  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  @bacolor:#453300;
  @titleColor:#9b9381;
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