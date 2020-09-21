<template>
  <div>
    <Header @choiceFun="choiceFun" :queryDate="queryDate" :totalBill="totalBill"/>
    <Detailed :queryDate="queryDate" @totalNumber="totalNumber"/>
    <popup :popShow="popShow" @popOff="popOff" @screenDate="screenDate"/>
  </div>
</template>

<script lang="js">
  import dayjs from "dayjs"
  import Header from "../components/detailed/Header";
  import Detailed from "../components/detailed/detailed"
  import Popup from "../components/detailed/popup";
  export default {
    name: "detailed",
    components: {Popup, Header,Detailed},
    data(){
      return{
        popShow:false,
        queryDate:null,
        totalBill:{}
      }
    },
    created() {
      let date = (dayjs().format('YYYY-MM')).split("-");
      this.queryDate = {
        year:date[0],
        month:date[1]
      }
    },
    methods:{
      choiceFun(state){
        this.popShow = state
      },
      popOff(state){
        this.popShow = state
      },
      screenDate(date){
        this.queryDate = date
      },
      //总数目
      totalNumber(data){
        this.totalBill = data
      }
    }
  }
</script>

<style lang="less" scoped>

</style>