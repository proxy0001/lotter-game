<template>
  <div class="history-panel">
    <pool v-for=" n in displayNum" :num="cols"></pool>
    <!--<div class="pool" v-for="buttle in buttles">
      <div class="ball" v-for="ball in buttle">
        <div class="inner">{{ball}}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { Bus } from './event-bus'

export default {
  data () {
    return {
      displayNum: 5,
      pools: [],
      drawHistory: [],
      cols: 4,
      buttles: [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
      balls: [1, 2, 3, 4],
    }
  },  
  created () {

  },
  mounted () {
    this.pools = this.$children
    Bus.$on( 'addDrawnData', ( data ) => {
      console.log( data )
      this.addHistoryData( data )
      this.loopPools( ( pool, data, index ) => {
        pool.createBalls( data )
        if ( index !== 0 ) {
          pool.resetColorOfBalls()
        }
      })
    })
  },
  destroyed () {

  },
  methods: {
    addHistoryData ( data ) {
      this.drawHistory.push( data )
    },
    getHistoryData ( n, direction = 1 ) {
      if ( direction > 0 ) {
        return this.drawHistory[ n ]
      } else {
        return this.drawHistory[ this.drawHistory.length - n - 1 ]
      }
    },
    loopPools ( callback, n = 0 ) {
      let data = this.getHistoryData( n, -1 )
      if ( n < this.pools.length && data ) {
        callback( this.pools[ n ], data, n )
        this.loopPools( callback, ++n )
      }
      return this
    }
  }
}
</script>

<style lang="scss">
  @import "../mixin.scss";

  .history-panel {
    width: 70%;
    padding: 24px;
    margin: 0 auto;
  }
</style>