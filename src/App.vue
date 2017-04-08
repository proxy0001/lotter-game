<template>
  <div id="app">
    <header class="header">
      <h3> {{title}} </h3>
      <p> {{description}} </p>
    </header>
    
    <section id="draw" class="">
      <div class="row">
        <div class="col-md-6 left-area">
          <number-panel></number-panel>
          <!--<span>Number Panel</span>-->
          
        </div>
        <div class="col-md-6 right-area">
          <history-panel></history-panel>
          <!--<span>History Panel</span>-->
          
        </div>
      </div>  
    </section>
    <section id="chart">
      <p>Chart Panel</p>
    </section>

       <!--<template v-for="variant in ['primary','secondary','success','outline-success','warning','danger','link']">
        <div class="col-md-4 pb-2" v-for="size in ['sm','','lg']">
          <b-button :size="size" :variant="variant" href="">
            {{variant}} {{size}}
          </b-button>
        </div>
      </template>-->   
  </div>
</template>

<script>
import NumberPanel from './components/number-panel'
import HistoryPanel from './components/history-panel'

export default {
  name: 'app',
  components: {
    'number-panel': NumberPanel,
    'history-panel': HistoryPanel,
  },
  data () {
    return {
      title: 'Lotter game',
      description: 'vue + bootstrap',
    }
  }
}
</script>

<style lang="scss">
  @import "./app.scss";
</style>
