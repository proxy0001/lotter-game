<template>
  <div class="chart-panel container">
    <!--<svg class="chart" width="600" height="300"></svg>-->
    <div>
      <bar-chart :data="barChartData"></bar-chart>
    </div>  
  </div>
</template>

<script>
import { Bus } from './event-bus'
import * as d3 from "d3"

export default {
  props: {
    values: {
      type: Array,
      default: [ 'default' ]
    }
  },
  data () {
    return {
      barChartData: this.values.map( ( value, index ) => { return { name: value, value: 0 } } )
    }
  },
  mounted () {
    Bus.$on( 'addDrawnData', ( data ) => {
      this.addCounts( data )
    })
  },
  methods: {
    addCounts( drawnData ) {
      this.values.forEach( ( value, index ) => {
        drawnData.forEach( item => {
          if ( item.value === value ) {
            this.barChartData[ index ].value++
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

  .chart-panel > div{
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
</style>