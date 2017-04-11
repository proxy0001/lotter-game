<template>
    <svg class="bar-chart" width="100%" height="100%"  viewBox="0 0 600 337"  preserveAspectRatio="none"></svg>
</template>

<script>

import * as d3 from "d3"

export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          { name: 'default', value: 0 }
        ]
      }
    },   
  },
  data () {
    return {

    }
  },
  mounted () {
    this.initChart( this.data )
  },
  watch: {
    data: {
      handler( data ) {
        // console.log( 'data watch' )
        this.data = data
        this.updateChart( this.data )
      },
      deep: true
    }
  },
  methods: {
    initChart ( data ) {
      this.svg = d3.select( 'svg.bar-chart' )
      this.margin = { top: 20, right: 20, bottom: 30, left: 40 }
      this.innerWidth = this.svg.node().clientWidth - this.margin.left - this.margin.right
      this.innerHeight = this.svg.node().clientHeight - this.margin.top - this.margin.bottom
      this.g = this.svg.append( 'g' )
        .attr( 'transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')' )
      
      let x = d3.scaleBand().rangeRound( [ 0, this.innerWidth ] ).padding( 0.1 )
      let y = d3.scaleLinear().rangeRound( [ this.innerHeight, 0 ] )

      x.domain( data.map( d => d.name ) )
      y.domain( [ 0, d3.max( data, d => ( d.value < 5 ) ? 5 : d.value  ) ] ) 

      let xAxis = d3.axisBottom( x )
      let yAxis = d3.axisLeft( y )

      this.g.append( 'g' )
        .attr( 'class', 'axis axis--x' )
        .attr( 'transform', 'translate(0,' + this.innerHeight + ')' )
        .call( xAxis )

      this.g.append( 'g' )
        .attr( 'class', 'axis axis--y' )
        .call( yAxis )

      let bars = this.g.selectAll( '.bar' )
        .data( data )
        .enter().append( 'g' )
        .attr( 'class', 'bar' )
        .attr( 'x', d => x( d.name ) )
        .attr( 'y', d => y( d.value ) )      
        .attr( 'transform', ( d, i ) => 'matrix(1,0,0,-1,' + x( d.name ) + ',' + this.innerHeight + ')' )
        
      bars.append( 'rect' )
        .attr( 'width', x.bandwidth() )

      bars.append( 'text' )
        .attr( 'transform', d => 'matrix(1, 0, 0, -1, 0, ' + ( this.innerHeight - y( d.value ) ) + ')' )
        .attr( 'width', x.bandwidth() )
        .attr( 'x', x.bandwidth() / 2 )
    },
    updateChart ( data ) {
      let x = d3.scaleBand().rangeRound( [ 0, this.innerWidth ] ).padding( 0.1 )
      let y = d3.scaleLinear().rangeRound( [ this.innerHeight, 0 ] )

      x.domain( data.map( d => d.name ) )
      y.domain( [ 0, d3.max( data, d => ( d.value < 5 ) ? 5 : d.value  ) ] ) 

      let xAxis = d3.axisBottom( x )
      let yAxis = d3.axisLeft( y )      

      let duration = this.g.transition().duration( 500 )
      
      duration.select( '.axis--x' ).call( xAxis )
      duration.select( '.axis--y' ).call( yAxis )

      duration.selectAll( '.bar rect' )
        .attr( 'height', d => this.innerHeight - y( d.value ) )

      duration.selectAll( '.bar text' )
        .attr( 'transform', d => 'matrix(1, 0, 0, -1, 0, ' + ( this.innerHeight - y( d.value ) ) + ')' )
        .attr( 'dy', d => ( d.value > 0 ) ? '1.2em' : '-.7em' )
        .text( d => d.value )
        .attr( 'display', d => ( d.value > 0 ) ? 'initial' : 'none' )
    },
  },
}
</script>

<style lang="scss">
  @import "../mixin.scss";

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

</style>