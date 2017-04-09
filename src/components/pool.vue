<template>
  <transition appear name="fade">
    <div class="pool">
      <ball v-for="(ball, index) in balls" :value="ball.value" :isShow="ball.isShow" :color="ball.color" :order="index"></ball>
    </div>
  </transition>  
</template>

<script>

export default {
  name: 'pool',
  props: {
    num: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 4,
    },
    cols: {
      type: Number,
      default: 4,
    },
  },
  data () {
    return {
      balls: []
    }
  },  
  created () {
    console.log( this.$options.name + ': created' )

  },
  mounted () {
    console.log( this.$options.name + ': mounted')
    this.setHeight()
    // this.showBalls()
    window.addEventListener('resize', this.setHeight)
  },  
  destoryed () {
    console.log( this.$options.name + ': destoryed')
    window.removeEventListener('resize')
  },

  computed: {

  },
  methods: {
    setHeight () {
      let height = Math.ceil( this.$props.num / this.$props.cols ) * this.$el.offsetWidth / this.$props.cols
      this.$el.style.height = height + 'px'
      return this
    },
    createBalls ( n = 0 ) {
      this.balls = Array( n ).fill( undefined ).map( ( value, index ) => {
        return {
          value: index + 1,
          color: 0,
          isShow: false,
        }
      }).sort( () => .5 - Math.random() )
      return this
    },
    showBalls ( n = 0 ) {
      let time = 50
      let promiseAry = this.balls.map( ( value, index ) => {
        return this.showBall( index, ( index + 1 ) * time )
      })
      return Promise.all( promiseAry )
    },
    showBall ( n, duration ) {
      return new Promise ( resolve => {
        setTimeout( () => {
          this.balls[ n ].isShow = true
          resolve()
        }, duration)
      })
    },
    changeColorOfBalls ( targets ) {
      targets.forEach( ( item, index ) => { 
        if ( index === targets.length - 1 ) {
          item.color = 2
        }else {
          item.color = 1
        }
      })
      return this
    },
    resetColorOfBalls () {
      this.balls.forEach( item => item.color = 0 )
      return this
    }
  },

}
</script>

<style lang="scss">
  @import "../mixin.scss";

  .pool {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    width: 80%;
    // min-height: 300px;
    margin: 0 auto;
    margin-bottom: 12px;
    border: 1px solid color( $colors, secondary );

  }

  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .5s
  // }
  // .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  //   opacity: 0
  // }
</style>