<template>
  <div class="home">
    <div class="Main-view">
      <div class="view-container">
        <router-view/>
      </div>
      <div class="nav-container">
        <navigation></navigation>
      </div>
    </div>
    <is-alert class="IsAlert-wrapper"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  import navigation from "@/components/navigation"
  import IsAlert from "@/components/isAlert"
export default {
  name: 'Home',
  components: {
    IsAlert,
    navigation
  },
  data(){
    return{
      active: 'home',
    }
  }
}
</script>
<style lang="less" scoped>
  @deep: ~'>>>';
  .home{
    max-width: 414px;
    margin: 0 auto;
    position: relative;
    > .IsAlert-wrapper{
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
  .Main-view{
    height: 100vh;
    display: flex;
    flex-direction: column;
    > .view-container{
      flex-grow: 1;
    }
    > .nav-container{
      @{deep} .van-tabbar--fixed{
        position: static;
      }
    }
  }


</style>
