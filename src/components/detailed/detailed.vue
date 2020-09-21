<template>
  <div>
    <div class="detailed-wrapper">
      <div class="detailed-date">
        <div>09月19日</div>
        <div>
          <span>收入: 96</span>
          <span>支出: 99</span>
        </div>
      </div>
      <div class="detailed-content">
        <div class="detailed-ICO">
          <div class="icon">
            icon
          </div>
          <div class="icon-title">工资</div>
        </div>
        <div class="price-content">
          96
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "detailed"
  }
</script>

<style lang="less" scoped>
  @backColor:#1b1b1b;
  @textColor:#474747;
  @iconColor:#e1e0e0;
  .detailed-wrapper{
    background: @backColor;
    >.detailed-date{
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid #313131;
    }
    > .detailed-content{
      display: flex;
      border-bottom: 1px solid rgba(184, 184, 184, 0.1);
      justify-content: space-between;
      padding: 10px 20px;
      color: @textColor;
      > .detailed-ICO{
        display: flex;
        align-items: center;
        color:@iconColor;
        > .icon{
          width: 54px;
          height: 54px;
          background: #ccc;
          border-radius: 50%;
        }
        > .icon-title{
          padding-left: 10px;
          font-size: 18px;
        }
      }
      > .price-content{
        color:@iconColor;
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    }
  }
</style>