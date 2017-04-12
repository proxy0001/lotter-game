<template>
  <div class="history-panel">
    <!--產生五個容器-->
    <div v-for=" n in displayNum" class="flex">
      <div class="icon">
        <span v-if="n === 1" class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
        <span v-if="n !== 1" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
      </div>
      <pool :num="cols"></pool>
    </div>
  </div>
</template>

<script>
  import {
    Bus
  } from './event-bus'
  
  export default {
    data() {
      return {
        displayNum: 5,
        pools: [],
        drawHistory: [],
        cols: 4,
      }
    },
    created() {
  
    },
    mounted() {
      // 指向容器陣列
      this.pools = this.$children
      /**
      * 新增一筆抽獎資料
      * 
      * @event
      * @param {Array} data 抽到的球的資料
      */
      Bus.$on('addDrawnData', (data) => {
        // 增加歷史資料
        this.addHistoryData(data)
        // 更新每個容器的球的顯示
        this.loopPools((pool, data, index) => {
          pool.setBalls(data)
          if (index !== 0) {
            pool.resetColorOfBalls()
          }
        })
      })
    },
    methods: {
      /**
      * 新增歷史資料
      * 
      * @param {Array} data 球的資料
      */
      addHistoryData(data) {
        this.drawHistory.push(data)
      },
      /**
      * 取得一筆歷史資料
      * 
      * @param {Number} n 第幾個
      * @param {Number} direction 從陣列的前面或後面開始算起
      * @return {Object} 球的資料定義
      */
      getHistoryData(n, direction = 1) {
        if (direction > 0) {
          return this.drawHistory[n]
        } else {
          return this.drawHistory[this.drawHistory.length - n - 1]
        }
      },
      /**
      * 尋訪所有的容器
      * 
      * @param {Fuction} execute 要執行的函式
      * @param {Number} n 尋訪幾個
      * @return {Object} this
      */
      loopPools(execute, n = 0) {
        let data = this.getHistoryData(n, -1)
        if (n < this.pools.length && data) {
          execute(this.pools[n], data, n)
          this.loopPools(execute, ++n)
        }
        return this
      }
    }
  }
</script>

<style lang="scss">
  @import "../mixin.scss";
  .history-panel {
    width: 90%;
    padding: 24px;
    margin: 0 auto;
    .flex {
      display: flex;
      width: 87%;
      align-items: center;
      margin: 0 0 12px auto;
      .icon {
        margin: 0 12px;
        color: rgba( color($colors, secondary), .54);
      }
      .pool {
        margin: 0;
      }
    }
    .flex:first-child {
      width: 100%;
      .icon {
        color: color($colors, danger);
      }
      .pool {
        // border-color: color($colors, danger);
      }
    }
  }
</style>