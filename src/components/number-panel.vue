<template>
  <div class="number-panel">
    <!--有16顆球的容器-->
    <pool :num="num"></pool>
    <!--抽獎按鈕-->
    <button v-show="isInit" v-on:click="onClick" type="button" class="btn btn-lg btn-danger btn-block">
        <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        DRAW
      </button>
  </div>
</template>

<script>
  import {
    Bus
  } from './event-bus'
  
  export default {
    props: {
      num: {
        type: Number,
        default: 16,
      },
      drawNum: {
        type: Number,
        default: 4,
      },
      values: {
        type: Array,
        default: () => ['default']
      },
    },
    data() {
      return {
        drawAry: [],
        pool: undefined,
        isInit: false,
        isAnimating: false,
      }
    },
    created() {
  
    },
    mounted() {
      // 指向裝有球的容器
      this.pool = this.$children[0]
      // 產生球 -> 動畫出現球
      this.pool.createBalls(this.randomValues).showBalls().then(() => {
        this.isInit = true
      })
    },
    computed: {
      // 根據values 產生新的亂數陣列
      randomValues() {
        return this.values.slice().sort(() => .5 - Math.random())
      }
    },
    methods: {
      /**
      * 點擊事件
      * 
      * @event
      */
      onClick() {
        if (!this.isInit || this.isAnimating) return
        // 重置所有球的顏色
        this.pool.resetColorOfBalls()
        // 抽獎動畫
        this.drawAnimation().then(() => {
          // 抽將動畫結束
          this.isAnimating = false
          // 抽獎
          this.drawAry = this.draw(this.pool.balls, this.drawNum)
          // 改變球的顏色
          this.pool.changeColorOfBalls(this.drawAry)
          // 發出事件 帶入 clone資料
          Bus.$emit('addDrawnData', this.drawAry.map(x => Object.assign({}, x)))
        })
      },

      /**
      * 抽獎函式
      * 
      * @param {Array} balls 球的資料陣列
      * @param {Number} n 抽獎數量
      */
      draw(balls, n) {
        let drawBox = [...Array(balls.length).keys()].sort(() => .5 - Math.random())
        if (n > balls.length) {
          n = balls.length
        }
        return Array(n).fill(undefined).map((item, index) => {
          return balls[drawBox[index]]
        })
      },
      /**
      * 抽獎動畫
      * 
      */      
      drawAnimation() {
        this.isAnimating = true
        this.pool.saveBalls()
        return new Promise(resolve => {
          let end = 30
          let start = 0
          this.animate(() => {
            if (start > end) {
              this.pool.resetBalls()
              resolve()
              return false
            } else {
              start++
              this.pool.wigglePositionOfBalls().wiggleColorOfBalls().wiggleValueOfBalls()
              return true
            }
          })
        })
      },
      /**
      * 產生動畫
      * 使用requestAnimationFrame 瀏覽器每次刷新時執行
      * 刷新頻率為1s 60幀, 1幀約16.7ms
      * 
      * @param {Function} change() : Boolean
      */   
      animate(change) {
        if (change()) {
          console.log('next');
          this._handler = window.requestAnimationFrame(() => this.animate(change));
        } else {
          console.log('cancel');
          this.stopAnimate();
        }
      },
      /**
      * 停止動畫
      * 
      */         
      stopAnimate() {
        window.cancelAnimationFrame(this._handler);
        this._handler = undefined;
      }
    },
  }
</script>

<style lang="scss">
  @import "../mixin.scss";
  .number-panel {
    width: 100%;
    padding: 24px;
    margin: 0 auto;
    .pool {
      width: 80%;
    }
    .btn>span {
      margin-right: 12px;
    }
  }
</style>