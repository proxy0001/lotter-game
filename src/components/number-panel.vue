<template>
  <div class="number-panel">
    <pool :num="num"></pool>    
    <button v-show="isInit" v-on:click="onClick" type="button" class="btn btn-lg btn-danger btn-block">
      <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
      DRAW
    </button>
  </div>
</template>

<script>
import { Bus } from './event-bus'

export default {
  props: {
    num: {
      type: Number,
      default: 16,
    },
    drawNum: {
      type: Number,
      default: 4,
    },
    values: {
      type: Array,
      default: () => [ 'default' ]
    },    
  },
  data () {
    return {
      drawAry: [],
      ballAry: [],
      pool: undefined,
      isInit: false,
    }
  },  
  created () {
    
  },
  mounted () {
    this.pool = this.$children[0]
    this.pool.createBalls( this.randomValues ).showBalls().then( () => {
      this.isInit = true
      this.ballAry = this.pool.balls
    })
  },
  computed: {
    randomValues() {
      return this.values.slice().sort( () => .5 - Math.random() )
    }
  },
  methods: {
    onClick () {
      if ( !this.isInit ) return
      // console.log('on click')
      this.pool.resetColorOfBalls()
      this.drawAry = this.draw( this.ballAry, 4)
      this.pool.changeColorOfBalls( this.drawAry )
      Bus.$emit( 'addDrawnData', this.drawAry.map( x => Object.assign( {}, x ) ) )
    },
    draw ( balls, n ) {
      let drawBox = [ ...Array( balls.length ).keys() ].sort( () => .5 - Math.random() )
      if (  n > balls.length ){
        n = balls.length
      }
      return Array( n ).fill( undefined ).map( ( item, index ) => {
        return balls[ drawBox[ index ] ]
      })
    }
  },  
}
</script>

<style lang="scss">
  @import "../mixin.scss";

  .number-panel {
    width: 100%;
    padding: 24px;
    margin: 0 auto;

    .pool {
      width: 80%;
    }

    .btn > span {
      margin-right: 12px;
    }
  }

</style>