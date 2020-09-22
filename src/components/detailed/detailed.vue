<template>
  <div class="detailed-view">
    <div class="detailed-wrapper"
         v-for="(item,index) in filterList"
         :key="index"
          v-show="!(filterList.length === 0)">
      <div class="detailed-date">
        <div>{{item.day}}</div>
        <div>
          <span class="dayAccount">收入: {{item.dayIncome}}</span>
          <span>支出: {{item.dayExpenditure}}</span>
        </div>
      </div>
      <div class="detailed-content"
           v-for="(itemChild,indexChild) in item.dataList"
           :key="indexChild">
        <div class="detailed-ICO">
          <div class="icon">
            <span class="icon iconfont iconColor"
                  v-html="itemChild.icon"></span>
          </div>
          <div class="icon-title">{{itemChild.name}}</div>
        </div>
        <div class="price-content">
          {{itemChild.type === "defrayList"?'-':"+"}} {{itemChild.price}}
        </div>
      </div>
    </div>
    <div v-show="filterList.length === 0" class="fill-wrapper">
      <div>
        <img :src="require('../../assets/img/null.jpg')" alt="" class="fill-Img">
        <p class="fill-content">没有本月记录</p>
      </div>

    </div>
  </div>
</template>

<script lang="js">
  import account from "../../lib/accountData";
  export default {
    name: "detailed",
    props:{
      queryDate:{
        default:null,
      }
    },
    watch:{
      queryDate(newVal,oldVal){
        this.lookupData()
      },
    },
    data(){
      return{
        DetailList:[],
        filterList:[],
      }
    },
    mounted() {
      this.lookupData()
    },
    methods:{
      lookupData(){
        this.DetailList = [];
        let date = `${this.queryDate.year}-${this.queryDate.month}`;
        let data = account.getAccount();
        if(data){
          data.forEach((item,index)=>{
            for(let key in item){
              if(key === date){
                this.DetailList.push(item[key])
              }
            }
          });
          this.format(this.DetailList,this.queryDate.month)
        }

      },
      //初始化数据
      format(data,month){
        if(data.length > 0){
          let init_data = []
          data.forEach((item,index)=>{
              for(let key in item){
                let obj = {
                  day:`${month}月${key}日`,
                  dataList:item[key],
                  dayExpenditure:0,
                  dayIncome:0
                }
                item[key].forEach((listItem,listIndex)=>{
                  if(listItem.type==="include"){
                    obj.dayIncome += parseFloat(listItem.price)
                  }else{
                    obj.dayExpenditure += parseFloat(listItem.price)
                  }
                })
                init_data.push(obj)
              }
          })
          this.filterList = init_data.reverse();
          this.totalBill()
        }else{
          this.filterList = [];
          this.$emit("totalNumber",{totalExpenditure:0,totalIncome:0})
        }
      },
      //计算本月总数
      totalBill(){
        let Expenditure = 0;
        let Income = 0;
        this.filterList.forEach((item,index)=>{
          Expenditure += item.dayExpenditure;
          Income += item.dayIncome
        })
        this.$emit("totalNumber",{totalExpenditure:Expenditure,totalIncome:Income})
      },


    }
  }
</script>

<style lang="less" scoped>
  @backColor:#fff;
  @textColor:#f7f8fa;
  @iconColor:#606266;
  .detailed-view{
    height: 81vh;
    overflow: auto;
    scrollbar-width: none;
    /* for Chrome */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .detailed-wrapper{
    background: @backColor;
    >.detailed-date{
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid rgba(192, 196, 204, 0.32);
      .dayAccount{
        padding-right: 10px;
        display: inline-block;
      }
    }
    > .detailed-content{
      display: flex;
      border-bottom: 1px solid rgba(184, 184, 184, 0.1);
      justify-content: space-between;
      padding: 10px 20px;
      color: @textColor;
      > .detailed-ICO{
        display: flex;
        align-items: center;
        color:@iconColor;
        > .icon{
          width: 54px;
          height: 54px;
          background: #EBEEF5;
          border-radius: 50%;
          > .iconColor{
            color:#2c3e50;
            font-size: 32px;
            line-height: 54px;
          }
        }
        > .icon-title{
          padding-left: 10px;
          font-size: 18px;
        }
      }
      > .price-content{
        color:@iconColor;
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    }
  }
  .fill-wrapper{
    height: 79vh;
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