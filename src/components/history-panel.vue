<template>
  <div class="history-panel">
    <div v-for=" n in displayNum" class="flex">
      <div class="icon">
        <span v-if="n === 1" class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
        <span v-if="n !== 1" class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
      </div>  
      <pool :num="cols"></pool>
    </div>  
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
    }
  },  
  created () {

  },
  mounted () {
    this.pools = this.$children
    Bus.$on( 'addDrawnData', ( data ) => {
      // console.log( data )
      this.addHistoryData( data )
      this.loopPools( ( pool, data, index ) => {
        pool.setBalls( data )
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
    width: 80%;
    padding: 24px;
    margin: 0 auto;

    .flex {
      display: flex;
      width: 87%;
      align-items: center;
      margin: 0 0 12px auto;
      .icon {
        margin: 0 12px;
        color: rgba( color($colors, secondary), .54 );
      }
      .pool {
        margin: 0;
      }      
    }
    .flex:first-child {
      width: 100%;
      .icon {
        color: color($colors, danger);
      }
      .pool {
        // border-color: color($colors, danger);
      }
    }    

  }
</style>