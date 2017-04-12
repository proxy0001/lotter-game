<template>
  <div :class="{ drawn: color===1, lastDrawn: color===2}" v-if="isShow" class="ball" :style="{ 'order': order }">
    <div class="inner">{{value}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ball',
    props: {
      value: {
        type: Number | String,
      },
      isShow: {
        type: Boolean,
        default: true,
      },
      color: {
        type: Number,
        default: 0,
      },
      order: {
        type: Number,
        default: 0
      },
    },
  }
</script>

<style lang="scss">
  @import "../mixin.scss";
  .ball {
    position: relative;
    width: 19%;
    margin: 3%;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgba( color($colors, secondary), .68);
    color: color($colors, light);
    .inner {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:after {
      content: '';
      display: block;
      margin-top: 100%;
    }
    &.drawn {
      color: color($colors, light);
      background-color: color( $colors, primary);
    }
    &.lastDrawn {
      color: color($colors, light);
      background-color: color( $colors, danger);
    }
  }
</style>