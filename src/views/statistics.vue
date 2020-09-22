<template>
  <div>
    <type @updateType="updateType"/>
    <overview  @choiceFun="choiceFun" :date="date"/>
    <statistical-select-date :popupShow="popupShow"
                             @currentDate="currentDate"
                             @popupIsShow="popupIsShow"/>
    <charts-line/>
    <charts-pie/>
  </div>
</template>

<script lang="js">
  import Type from "../components/record/type";
  import Overview from "../components/statistics/overview";
  import StatisticalSelectDate from "../components/statistics/StatisticalSelectDate";
  import dayjs from "dayjs"
  import ChartsLine from "../components/statistics/chartsLine"
  import ChartsPie from "../components/statistics/chartsPie";
  export default {
    name: "statistics",
    components: {ChartsPie, ChartsLine, StatisticalSelectDate, Overview, Type},
    data(){
      return{
        popupShow:false,
        date:{
          month:"",
          year:""
        },
      }
    },
    created() {
      let data = (dayjs().format('YYYY-MM')).split("-");
      this.date.month  = data[1]
      this.date.year  = data[0]
    },
    methods:{
      //操作状态
      updateType(type){
        console.log(type)
      },
      choiceFun(state){
        this.popupShow = state
      },
      popupIsShow(state){
        this.popupShow = state
      },
      currentDate(dates){
        console.log(dates)
        let data = (dayjs(dates).format('YYYY-MM')).split("-");
        this.date.month  = data[1]
        this.date.year  = data[0]
        console.log(this.date)
      }
    }

  }
</script>

<style lang="less" scoped>





</style>