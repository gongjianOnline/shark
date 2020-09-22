<template>
  <div>
    <div class="ecarts" id="line"></div>
  </div>
</template>

<script lang="js">
  import 'echarts/lib/chart/line'
  export default {
    name: "chartsLine.vue",
    data(){
      return{
        option:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          grid:{
            left:10,
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
              show:false
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
    mounted() {
      this.renderCharts()
    },
    methods:{
      renderCharts(){
        let myCharts= this.$echarts.init(document.getElementById("line"));
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