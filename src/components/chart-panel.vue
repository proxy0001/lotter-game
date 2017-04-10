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
    let margin = { top: 20, right: 30, bottom: 30, left: 40 }
    let width = svg.attr( 'width' ) - margin.left - margin.right
    let height = svg.attr( 'height' ) - margin.top - margin.bottom

    let x = d3.scaleBand().rangeRound( [ 0, width ] ).padding( 0.1 )
    let y = d3.scaleLinear().rangeRound( [ height, 0 ] )

    let g = svg.append( 'g' )
      .attr( 'transform', 'translate(' + margin.left + ',' + margin.top + ')' )

    let xAxis = d3.axisBottom( x )
    let yAxis = d3.axisLeft( y ).ticks( 10, '%' )

    x.domain( data.map( d => d.name ) )
    y.domain( [ 0, d3.max( data, d => d.value ) ] )

    svg.append( 'g' )
      .attr( 'class', 'axis axis--x' )
      .attr( 'transform', 'translate(0,' + height + ')' )
      .call( xAxis )

    svg.append( 'g' )
      .attr( 'class', 'axis axis--y' )
      .call( yAxis )
      // .append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 6)
      // .attr("dy", "0.71em")
      // .attr("text-anchor", "end")
      // .text("Frequency");


    console.log( x )
    svg.selectAll( '.bar' )
      .data( data )
      .enter().append( 'rect' )
      .attr( 'class', 'bar' )
      .attr( 'x', d => d.name )
      .attr( 'y', d => d.value )
      .attr( 'height', d => height - y( d.value ) )
      .attr( 'width', x.bandwidth() )

    // let barWidth = width / data.length
    // let bar = chart.selectAll( 'g' )
    //   .data( data )
    //   .enter().append( 'g' )
    //   .attr( 'transform', ( d, i ) => 'translate(' + i * barWidth + ',0)' )

    // bar.append( 'rect' )
    //   .attr( 'y', d => y( d.value ) )
    //   .attr( 'height', d => height - y( d.value ) )
    //   .attr( 'width', barWidth - 1 )

    // bar.append( 'text' )
    //   .attr( 'x', barWidth / 2 )
    //   .attr( 'y', d => y( d.value ) + 3 )
    //   .attr( 'dy', '.75em' )
    //   .text( d => d.value )

    // let barHeight = 20
    // console.log(d3)
    // let x = d3.scaleLinear().range([0, width])
    // x.domain([0,d3.max(data, d => d.value)])
    // console.log(x)
    // let chart = d3.select('#chart')
    //   .attr('width', width)
    //   .attr('height', barHeight * data.length)
    // let bar = chart.selectAll("g")
    //   .data(data).enter().append("g")
    //   .attr("transform", (d, i) => "translate(0," + i * barHeight + ")" )
      
    // bar.append("rect")
    //   .attr("width", d => x(d.value))
    //   .attr("height", barHeight - 1)

    // bar.append("text")
    //   .attr("x", d => x(d.value) - 3 )
    //   .attr("y", barHeight / 2)
    //   .attr("dy", ".35em")
    //   .text( d => d.value )


    
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
    .chart rect {
      fill: steelblue;
    }

    .chart text {
      fill: white;
      font: 10px sans-serif;
      text-anchor: middle;
    }
  }
</style>