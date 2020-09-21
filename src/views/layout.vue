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

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  import navigation from "@/components/navigation"
export default {
  name: 'Home',
  components: {
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
