<template>
  <div>
    <van-popup v-model="popupShow"
               position="bottom"
               :close-on-click-overlay="false"
               :style="{ height: '60%' }" >
      <van-datetime-picker
        @cancel="cancel"
        @confirm="confirm"
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :formatter="formatter"
      />

    </van-popup>

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Popup ,DatetimePicker } from 'vant';

  Vue.use(Popup);
  Vue.use(DatetimePicker);
  export default {
    name: "StatisticalSelectDate",
    data(){
      return{
        currentDate:new Date(),
      }
    },
    props:{
      popupShow:{
        default:false
      }
    },
    methods:{
      //时间选择器
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
        return val;
      },
      cancel(){
        this.$emit("popupIsShow",false)
      },
      confirm(){
        this.$emit("popupIsShow",false)
        this.$emit("currentDate",this.currentDate)
      },


    }
  }
</script>

<style scoped>

</style>