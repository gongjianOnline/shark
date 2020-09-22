<template>
  <div>
    <div class="charts" id="pie"></div>
  </div>
</template>

<script>
  import 'echarts/lib/chart/pie'
  export default {
    name: "chartsPie",
    data(){
      return{
        option:{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '55%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.renderCharts()
    },
    methods:{
      renderCharts(){
        let myCharts= this.$echarts.init(document.getElementById("pie"));
        myCharts.setOption(this.option);
      }
    }

  }
</script>

<style lang="less" scoped>
.charts{
  width: 100%;
  height: 40vh;
}
</style>