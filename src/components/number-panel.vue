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
      pool: undefined,
      isInit: false,
      isAnimating: false,
    }
  },  
  created () {
    
  },
  mounted () {
    this.pool = this.$children[0]
    this.pool.createBalls( this.randomValues ).showBalls().then( () => {
      this.isInit = true
    })
  },
  computed: {
    randomValues() {
      return this.values.slice().sort( () => .5 - Math.random() )
    }
  },
  methods: {
    onClick () {
      if ( !this.isInit || this.isAnimating ) return
      this.pool.resetColorOfBalls()
      this.drawAnimation().then( () => {
        this.isAnimating = false
        console.log('animation end')
        this.drawAry = this.draw( this.pool.balls, 4)
        this.pool.changeColorOfBalls( this.drawAry )
        Bus.$emit( 'addDrawnData', this.drawAry.map( x => Object.assign( {}, x ) ) )
      })
    },
    draw ( balls, n ) {
      let drawBox = [ ...Array( balls.length ).keys() ].sort( () => .5 - Math.random() )
      if (  n > balls.length ){
        n = balls.length
      }
      return Array( n ).fill( undefined ).map( ( item, index ) => {
        return balls[ drawBox[ index ] ]
      })
    },
    drawAnimation () {
      this.isAnimating = true
      this.pool.saveBalls()
      return new Promise( resolve => {
        let end = 30
        let start = 0
        this.animate( () => {
          if ( start > end ) {
            this.pool.resetBalls()
            resolve()
            return false
          }else {
            start++
            this.pool.wigglePositionOfBalls().wiggleColorOfBalls().wiggleValueOfBalls()
            return true
          }
        })
        // setTimeout( () => resolve(), 1000)
      })
    },
    // 1s為60幀, 1幀約16.7ms
    animate ( change ) {
      if ( change() ) {
        console.log( 'next' );
        this._handler = window.requestAnimationFrame( () => this.animate( change ) );
      }else {
        console.log( 'cancel' );
        this.stopAnimate();
      }     
    },
    stopAnimate () {
      window.cancelAnimationFrame( this._handler );
      this._handler = undefined;      
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