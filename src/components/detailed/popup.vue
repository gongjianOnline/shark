<template>
  <div>
    <van-popup v-model="popShow"
               position="bottom"
               :close-on-click-overlay="false"
               :style="{ height: '50%' }" >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        @confirm="confirm"
        @cancel="cancel"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script lang="js">
  import dayjs from "dayjs"
  import Vue from 'vue';
  import { Popup } from 'vant';
  Vue.use(Popup);
  export default {
    name: "popup",
    data(){
      return{
        currentDate: new Date(),
      }
    },
    props:{
      popShow:{
        default:false
      }
    },
    methods:{
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
      },
      confirm(){
        let date = (dayjs(this.currentDate).format('YYYY-MM').split('-'))
        this.$emit("popOff",false)
        this.$emit("screenDate",{year:date[0],month:date[1]})
      },
      cancel(){
        this.$emit("popOff",false)
      },
    }
  }
</script>

<style lang="less" scoped>

</style>