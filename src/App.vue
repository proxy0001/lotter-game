<template>
  <div id="app">
    <header class="header">
      <h3> {{title}} </h3>
      <p> {{description}} </p>
    </header>
  
    <section id="draw-section" class="container-fuild">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 left-area">
            <!--抽獎面板-->
            <number-panel :num="num" :drawNum="drawNum" :values="values"></number-panel>
          </div>
          <div class="col-sm-6 right-area">
            <!--得獎紀錄面板-->
            <history-panel></history-panel>
          </div>
        </div>
      </div>
    </section>
  
    <section id="chart-section" class="container-fuild">
      <div class="container">
        <h3>Chart Panel</h3>
        <!--圖表面板-->
        <chart-panel :values="values"></chart-panel>
      </div>
    </section>
  </div>
</template>

<script>
  import NumberPanel from './components/number-panel'
  import HistoryPanel from './components/history-panel'
  import ChartPanel from './components/chart-panel'
  
  export default {
    name: 'app',
    components: {
      'number-panel': NumberPanel,
      'history-panel': HistoryPanel,
      'chart-panel': ChartPanel,
    },
    computed: {
      // 根據num的值 產生獎項的陣列 1~16
      values() {
        return [...Array(this.num).keys()].map(x => ++x)
      },
    },
    data() {
      return {
        title: 'Lotter game',
        description: 'vue + bootstrap',
        // 產生幾個獎項
        num: 16,
        // 一次抽幾個
        drawNum: 4,
      }
    },
    created() {
  
    }
  }
</script>

<style lang="scss">
  @import "./app.scss";
</style>
