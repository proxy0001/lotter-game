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
            <number-panel :num="num" :drawNum="drawNum" :values="values" ></number-panel>
            
          </div>
          <div class="col-sm-6 right-area">
            <history-panel></history-panel>
          </div>
        </div>
      </div>
    </section>
    
    <section id="chart-section" class="container-fuild">
      <div class="container">
        <h3>Chart Panel</h3>
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
    values() {
      return [ ...Array( this.num ).keys() ].map( x => ++x )
    },
  },
  data () {
    return {
      title: 'Lotter game',
      description: 'vue + bootstrap',
      num: 16,
      drawNum: 4,
    }
  },
  created () {
    
  }
}
</script>

<style lang="scss">
  @import "./app.scss";
</style>
