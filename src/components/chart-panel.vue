<template>
  <div class="chart-panel container">
    <div>
      <!--長柱型圖表-->
      <bar-chart :data="barChartData"></bar-chart>
    </div>
  </div>
</template>

<script>
  import {
    Bus
  } from './event-bus'
  import * as d3 from "d3"
  
  export default {
    props: {
      values: {
        type: Array,
        default: ['default']
      }
    },
    data() {
      return {
        // 給圖表用的資料
        barChartData: this.values.map((value, index) => {
          return {
            name: value,
            value: 0
          }
        })
      }
    },
    mounted() {
      /**
      * 新增一筆抽獎資料
      * 
      * @event
      * @param {Array} data 抽到的球的資料
      */
      Bus.$on('addDrawnData', (data) => {
        this.addCounts(data)
      })
    },
    methods: {
      /**
      * 增加被抽過的次數
      * 更新圖表需要用的資料 barChatData
      * 
      * @param {Array} drawnData 抽到的球的資料
      */
      addCounts(drawnData) {
        this.values.forEach((value, index) => {
          drawnData.forEach(item => {
            if (item.value === value) {
              this.barChartData[index].value++
            }
          })
        })
        return this
      },
    },
  }
</script>

<style lang="scss">
  @import "../mixin.scss";
  .chart-panel>div {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
</style>