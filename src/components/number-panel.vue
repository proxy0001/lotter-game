<template>
  <div class="number-panel">
    <pool :num="num"></pool>
    
    <button v-show="isInit" v-on:click="onClick" type="button" class="btn btn-lg btn-danger btn-block">Draw</button>
    
  </div>
</template>

<script>


// let balls = [ ...Array( num ).keys() ].map( x => ++x )
export default {
  data () {
    return {
      num: 16,
      drawNum: 4,
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
    this.pool.createBalls( this.num ).showBalls().then( () => {
      this.isInit = true
      this.ballAry = this.pool.balls
      console.log(this.ballAry)
    })
  },

  methods: {
    onClick () {
      if ( !this.isInit ) return
      console.log('on click')
      this.pool.resetColorOfBalls()
      this.drawAry = this.draw( this.ballAry, 4)
      console.log(this.drawAry)
      this.pool.changeColorOfBalls( this.drawAry )
    },
    draw ( balls, n ) {
      // balls = balls.slice()
      // return Array( n ).fill( undefined ).map( () => {
      //   return balls.splice( Math.floor( Math.random() * balls.length ), 1 )[0]
      // })
      // [ ...Array( this.$props.num ).keys() ].map( x => ++x ).sort( () => .5 - Math.random() )
      let drawBox = [ ...Array( balls.length ).keys() ].sort( () => .5 - Math.random() )
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
    width: 80%;
    padding: 24px;
    margin: 0 auto;
  }
</style>