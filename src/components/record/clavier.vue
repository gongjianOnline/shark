<template>
  <div class="box">
    <van-popup v-model="modeShow"
               position="bottom"
               :close-on-click-overlay="false"
               :style="{ height: '55%' }">
      <van-field v-model="numberPads" type="number" placeholder="请输入金额" readonly/>
      <van-number-keyboard
        :show="show"
        theme="custom"
        :extra-key="['00','.']"
        close-button-text="完成"
        @close="numberPadsClose"
        @input="onInput"
        @delete="onDelete"
      />
    </van-popup>

  </div>
</template>

<script lang="js">
  import Vue from 'vue';
  import { NumberKeyboard,Popup,Field,Dialog} from 'vant';
  Vue.use(NumberKeyboard);
  Vue.use(Popup);
  Vue.use(Field);
  export default {
    name: "clavier.vue",
    data(){
      return{
        show:true,
        numberPads:"",
        isModeShow:false,
        X:null
      }
    },
    props:{
      modeShow:{
        default:false
      }
    },
    computed:{
      modeShows(){
        return `${this.modeShow}`
      }
    },
    methods:{
      numberPadsClose(){
        if(this.numberPads === ""){
          Dialog({ message: '金额不能为空' });
        }else{
          this.$emit('onBlurs',this.numberPads);
          this.numberPads = "";
        }
        this.$emit("numberPadsClose",false)
      },
      onInput(key){
        if(key === 0){
          if(this.numberPads == key){
            return
          }
        }
        this.numberPads += key
      },
      onDelete(){
        this.numberPads =this.numberPads.substr(0,this.numberPads.length-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .box{
    @{deep} .van-cell{
      top: 45px;
      text-align: right;
    }
    @{deep} .van-field__control{
      text-align: right;
    }
  }
</style>