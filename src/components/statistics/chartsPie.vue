<template>
  <div>
    <div class="charts" id="pie" v-show="isShow"></div>
  </div>
</template>

<script>
  import 'echarts/lib/chart/pie';
  import settle from "../../lib/settleAccounts";
  export default {
    name: "chartsPie",
    data(){
      return{
        isShow:true,
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
              name: '月收入',
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
        let data = settle.pieFun(date,state);
        this.option.legend.data = data.lengthArr;
        this.option.series[0].data = data.seriesArr;
        this.isShow = data.isShow;
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