<template>
  <transition appear name="fade">
    <div class="pool">
      <ball v-for="(ball, index) in balls" :value="ball.value" :isShow="ball.isShow" :color="ball.color" :order="index"></ball>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'pool',
    props: {
      num: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 4,
      },
      cols: {
        type: Number,
        default: 4,
      },
    },
    data() {
      return {
        balls: []
      }
    },
    mounted() {
      // 預先算出高度
      this.setHeight()
      // resize時重新計算高度
      window.addEventListener('resize', this.setHeight)
    },
    destoryed() {
      window.removeEventListener('resize')
    },
  
    computed: {
  
    },
    methods: {
      /**
      * 改變容器的高度
      * 
      * @return this
      */
      setHeight() {
        let height = Math.ceil(this.$props.num / this.$props.cols) * this.$el.offsetWidth / this.$props.cols
        this.$el.style.height = height + 'px'
        return this
      },
      /**
      * 將資料更新成所給予的資料
      * 
      * @param {Array} balls 球的資料陣列
      * @return this
      */
      setBalls(balls) {
        this.balls = balls
        return this
      },
      /**
      * 產生球的資料陣列
      * 
      * @param {Array} values 有哪些球的 陣列資料
      * @return this
      */
      createBalls(values) {
        this.balls = values.map(value => {
          return {
            value: value,
            color: 0,
            isShow: false,
          }
        })
        return this
      },
      /**
      * 動畫將所有球顯現出來
      * 
      * @param {Number} n 從陣列的何處開始
      * @return {Promise}
      */
      showBalls(n = 0) {
        let time = 50
        let promiseAry = this.balls.map((value, index) => {
          return this.showBall(index, (index + 1) * time)
        })
        return Promise.all(promiseAry)
      },
      /**
      * 將指定球顯現出來
      * 
      * @param {Number} n 第幾個球
      * @param {Number} duration 間隔幾毫秒
      * @return {Promise}
      */
      showBall(n, duration) {
        return new Promise(resolve => {
          setTimeout(() => {
            this.balls[n].isShow = true
            resolve()
          }, duration)
        })
      },
      /**
      * 改變哪些球的顏色
      * 
      * @param {Array} targets 哪些球的資料
      * @return this
      */
      changeColorOfBalls(targets) {
        targets.forEach((item, index) => {
          if (index === targets.length - 1) {
            item.color = 2
          } else {
            item.color = 1
          }
        })
        return this
      },
      /**
      * 初始化所有球的顏色
      * 
      * @return this
      */      
      resetColorOfBalls() {
        this.balls.forEach(item => item.color = 0)
        return this
      },
      /**
      * 給予所有球亂數的顏色設定
      * 顏色種類為 0~2
      * 
      * @return this
      */
      wiggleColorOfBalls() {
        this.balls.forEach(item => item.color = (Math.random() * 100 | 0) % 3)
        return this
      },
      /**
      * 給予所有球亂數的數值設定
      * 數值種類為 1~16
      * 
      * @return this
      */
      wiggleValueOfBalls() {
        this.balls.forEach(item => item.value = (Math.random() * 100 | 0) % 16 + 1)
        return this
      },
      /**
      * 給予所有球亂數的位置偏移量
      * 位置偏移量x為 -5 ~ 5
      * 位置偏移量y為 -5 ~ 5
      * 
      * @return this
      */      
      wigglePositionOfBalls() {
        this.$children.forEach(item => {
          let x = (Math.random() * 100 | 0) % 10 - 5
          let y = (Math.random() * 100 | 0) % 10 - 5
          item.$el.style.transform = `translate( ${x}px, ${y}px )`
        })
        return this
      },
      /**
      * 將球的資料緩存起來 以用來回復
      * 
      * @return this
      */       
      saveBalls() {
        this._balls = this.balls.map(x => Object.assign({}, x))
        return this
      },
      /**
      * 初始化球的資料陣列 根據緩存的資料
      * 
      * @return this
      */           
      resetBalls() {
        this.balls = this._balls.map(x => Object.assign({}, x))
        this.$children.forEach(item => {
          item.$el.style.transform = `translate( 0px, 0px )`
        })
        return this
      },
    },
  
  }
</script>

<style lang="scss">
  @import "../mixin.scss";
  .pool {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 12px;
    border: 1px solid rgba( color($colors, secondary), .68);
  }
</style>