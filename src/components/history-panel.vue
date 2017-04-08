<template>
  <div class="history-panel">
    <div class="pool" v-for="buttle in buttles">
      <div class="ball" v-for="ball in buttle">
        <div class="inner">{{ball}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttles: [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
      balls: [1, 2, 3, 4],
    }
  }
}
</script>

<style lang="scss">
  @import "../mixin.scss";

  .history-panel {
    width: 70%;
    padding: 24px;
    margin: 0 auto;

    .buttle {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      width: 80%;
      margin: 0 auto;
      margin-bottom: 12px;
      border: 1px solid color( $colors, secondary );

    }

  .ball {
    position: relative;
    width: 21%;
    margin: 2%;
    border-radius: 50%;
    background-color: color( $colors, secondary );
    overflow: hidden;

    &:after {
      content: '';
      display: block;
      margin-top: 100%;
    }

    .inner {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: color($colors, light);    
    }    
  }




  }
</style>