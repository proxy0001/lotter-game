<template>
    <svg class="bar-chart"></svg>
</template>

<script>

import * as d3 from "d3"

export default {
  props: {
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    },
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
  computed: {

  },  
  created () {

  },
  mounted () {
    this.svg = d3.select( 'svg.bar-chart' ).attr( 'width', this.width ).attr( 'height', this.height )
    this.margin = { top: 30, right: 30, bottom: 30, left: 30 }
    this.innerWidth = this.svg.attr( 'width' ) - this.margin.left - this.margin.right
    this.innerHeight = this.svg.attr( 'height' ) - this.margin.top - this.margin.bottom
    this.g = this.svg.append( 'g' )
      .attr( 'transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')' )
    
    this.createChart( this.data )
    console.log( this.data )
  },
  destroyed () {

  },
  watch: {
    data: {
      handler( data ) {
        console.log( 'data watch' )
        this.data = data
        this.updateChart( this.data )
      },
      deep: true
    }
  },
  methods: {
    updateChart ( data ) {
      let x = d3.scaleBand().rangeRound( [ 0, this.innerWidth ] ).padding( 0.1 )
      let y = d3.scaleLinear().rangeRound( [ this.innerHeight, 0 ] )

      x.domain( data.map( d => d.name ) )
      y.domain( [ 0, d3.max( data, d => d.value ) ] ) 

      let xAxis = d3.axisBottom( x )
      let yAxis = d3.axisLeft( y )      

     
      this.g.select( 'axis--x' )
        .transition().duration( 500 )
        // .attr( 'transform', 'translate(0,' + this.innerHeight + ')' )
        .call( xAxis )

      this.g.select( 'axis--y' )
        .transition().duration( 500 )
        .call( yAxis )

      // g.append( 'text' )
      //   .attr( 'transform', 'rotate(-90)' )
      //   .attr( 'y', 6 )
      //   .attr( 'dy', '0.7em' )
      //   .attr( 'text-anchor', 'end' )
      //   .text( 'value' )
      console.log( this.g )
      let bars = this.g.selectAll( '.bar' )
        .transition().duration( 500 )
        // .attr( 'x', d => x( d.name ) )
        .attr( 'y', d => y( d.value ) )      
        .attr( 'transform', ( d, i ) => 'translate(' + x( d.name ) + ',' + y( d.value ) + ')' )
        
      bars.selectAll( 'rect' )
        .transition().duration(500)
        .attr( 'height', d => this.innerHeight - y( d.value ) )
        .attr( 'width', x.bandwidth() )

      bars.selectAll( 'text' )
        .attr( 'width', x.bandwidth() )
        .attr( 'x', x.bandwidth() / 2 )
        .attr( 'dy', d => ( d.value > 0 ) ? '1.2em' : '-.7em' )
        .text( d => d.value )



      // bars.exit().transition().duration(500)
      //   .selectAll("rect")
      //   .attr("height", 0)
      //   .remove();        
    },
    createChart ( data ) {

      // let svg = d3.select( 'svg.bar-chart' ).attr( 'width', this.width ).attr( 'height', this.height )
      // let margin = { top: 30, right: 30, bottom: 30, left: 30 }
      // let width = svg.attr( 'width' ) - margin.left - margin.right
      // let height = svg.attr( 'height' ) - margin.top - margin.bottom

      let x = d3.scaleBand().rangeRound( [ 0, this.innerWidth ] ).padding( 0.1 )
      let y = d3.scaleLinear().rangeRound( [ this.innerHeight, 0 ] )

      x.domain( data.map( d => d.name ) )
      y.domain( [ 0, d3.max( data, d => d.value ) ] )

      let xAxis = d3.axisBottom( x )
      // let yAxis = d3.axisLeft( y ).ticks( 10, '%' )
      let yAxis = d3.axisLeft( y )

      // let g = svg.append( 'g' )
      //   .attr( 'transform', 'translate(' + margin.left + ',' + margin.top + ')' )



      this.g.append( 'g' )
        .attr( 'class', 'axis axis--x' )
        .attr( 'transform', 'translate(0,' + this.innerHeight + ')' )
        .call( xAxis )

      this.g.append( 'g' )
        .attr( 'class', 'axis axis--y' )
        .call( yAxis )

      // g.append( 'text' )
      //   .attr( 'transform', 'rotate(-90)' )
      //   .attr( 'y', 6 )
      //   .attr( 'dy', '0.7em' )
      //   .attr( 'text-anchor', 'end' )
      //   .text( 'value' )

      let bars = this.g.selectAll( '.bar' )
        .data( data )
        .enter().append( 'g' )
        .attr( 'class', 'bar' )
        .attr( 'x', d => x( d.name ) )
        .attr( 'y', d => y( d.value ) )      
        .attr( 'transform', ( d, i ) => 'translate(' + x( d.name ) + ',' + y( d.value ) + ')' )
        
      bars.append( 'rect' )
        .transition().duration(500)
        .attr( 'height', d => this.innerHeight - y( d.value ) )
        .attr( 'width', x.bandwidth() )

      bars.append( 'text' )
        .attr( 'width', x.bandwidth() )
        .attr( 'x', x.bandwidth() / 2 )
        .attr( 'dy', d => ( d.value > 0 ) ? '1.2em' : '-.7em' )
        .text( d => d.value )



      // bars.exit().transition().duration(500)
      //   .selectAll("rect")
      //   .attr("height", 0)
      //   .remove();  
    }
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