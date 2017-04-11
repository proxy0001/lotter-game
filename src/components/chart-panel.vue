<template>
  <div class="chart-panel container">
    <svg id="svg" class="chart" width="600" height="300"></svg>
  </div>
</template>

<script>
import { Bus } from './event-bus'
import * as d3 from "d3"
console.log(d3)




export default {
  data () {
    return {

    }
  },  
  created () {

  },
  mounted () {

    let data = [...Array(16).keys()].map( item => {
      return {
        name: item + 1, 
        value: item + 1
      }
    })
    console.log(data)

    let svg = d3.select( '#svg' )
    let margin = { top: 30, right: 30, bottom: 30, left: 30 }
    let width = svg.attr( 'width' ) - margin.left - margin.right
    let height = svg.attr( 'height' ) - margin.top - margin.bottom

    let x = d3.scaleBand().rangeRound( [ 0, width ] ).padding( 0.1 )
    let y = d3.scaleLinear().rangeRound( [ height, 0 ] )

    let xAxis = d3.axisBottom( x )
    // let yAxis = d3.axisLeft( y ).ticks( 10, '%' )
    let yAxis = d3.axisLeft( y )

    let g = svg.append( 'g' )
      .attr( 'transform', 'translate(' + margin.left + ',' + margin.top + ')' )

    x.domain( data.map( d => d.name ) )
    y.domain( [ 0, d3.max( data, d => d.value ) ] )

    g.append( 'g' )
      .attr( 'class', 'axis axis--x' )
      .attr( 'transform', 'translate(0,' + height + ')' )
      .call( xAxis )

    g.append( 'g' )
      .attr( 'class', 'axis axis--y' )
      .call( yAxis )

    // g.append( 'text' )
    //   .attr( 'transform', 'rotate(-90)' )
    //   .attr( 'y', 6 )
    //   .attr( 'dy', '0.7em' )
    //   .attr( 'text-anchor', 'end' )
    //   .text( 'value' )

    let bars = g.selectAll( '.bar' )
      .data( data )
      .enter().append( 'g' )
      .attr( 'class', 'bar' )
      .attr( 'x', d => x( d.name ) )
      .attr( 'y', d => y( d.value ) )      
      .attr( 'transform', ( d, i ) => 'translate(' + x( d.name ) + ',' + y( d.value ) + ')' )
    
    bars.append( 'rect' )
      .attr( 'height', d => height - y( d.value ) )
      .attr( 'width', x.bandwidth() )

    bars.append( 'text' )
      .attr( 'width', x.bandwidth() )
      .attr( 'x', x.bandwidth() / 2 )
      .attr( 'dy', '1.2em' )
      .text( d => d.value )
    
  },
  destroyed () {

  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import "../mixin.scss";

  .chart-panel{
    .bar rect {
      fill: rgba( color($colors, light), .68 );
    }

    .bar text {
      fill: rgba( color($colors, dark), .9 );
      font: 10px sans-serif;
      text-anchor: middle;
    }

    .bar:hover rect {
      fill: rgba( color($colors, danger), .9 );
    }
    .bar:hover text {
      fill: rgba( color($colors, light), .9 );
    }
    
    .axis path, .axis line {
      // display: none;
      stroke: rgba( color($colors, dark), .68 );
    }
    .axis text {
      fill: rgba( color($colors, dark), .68 );
    }
  }
</style>