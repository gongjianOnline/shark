<template>
  <div>
    <div class="ecarts" id="line" v-show="isData"></div>
  </div>
</template>

<script lang="js">
  import 'echarts/lib/chart/line';
  import settle from "../../lib/settleAccounts";
  import "../../assets/walden"
  export default {
    name: "chartsLine.vue",
    data(){
      return{
        isData:true,
        option:{
          textStyle:{
            fontSize:"16"
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          grid:{
            left:30,
            right:10,
            top:10,
            bottom:30
          },
          yAxis: {
            type: 'value',
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              show:true
            }
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        }
      }
    },
    props:{
      date:{
        default:null
      },
      state:{
        default:null
      }
    },
    watch:{
      date(newVal,oldVal){
        this.renderCharts(newVal,this.state)
      },
      state(newVal,oldVal){
        this.renderCharts(this.date,newVal)
      }
    },
    mounted() {
      this.renderCharts(this.date,this.state)
    },
    methods:{
      renderCharts(date,state){
        let data = settle.LineFun(date,state);
        this.option.xAxis.data = data.xAxisData;
        this.option.series[0].data = data.seriesData;
        this.isData = data.isData;
        this.$emit("isShowChart",data.isData)
        let myCharts= this.$echarts.init(document.getElementById("line"),"walden");
        myCharts.setOption(this.option);
      }
    },
  }
</script>

<style lang="less" scoped>
.ecarts{
  width: 100%;
  height: 30vh;
}
</style>