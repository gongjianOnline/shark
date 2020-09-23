<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="detailed" icon="gold-coin-o">明细</van-tabbar-item>
    <van-tabbar-item name="record" icon="plus">记账</van-tabbar-item>
    <van-tabbar-item name="statistics" icon="chart-trending-o">统计</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="js">
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  export default {
    data(){
      return{
        active: 'record',
      }
    },
    created() {
      this.active = window.localStorage.getItem('active') || "record";
    },
    methods:{
      onChange(){
        window.localStorage.setItem('active',this.active)
        this.$router.push({
          name:this.active
        })
      }
    },



  }
</script>

<style lang="less" scoped>



  
</style>