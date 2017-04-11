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
  mounted () {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  },  
  destoryed () {
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
    setBalls ( balls ) {
      this.balls = balls
      return this
    },
    createBalls ( values ) {
      this.balls = values.map( value => {
        return {
          value: value,
          color: 0,
          isShow: false,
        }
      })
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
    width: 100%;
    margin: 0 auto;
    margin-bottom: 12px;
    border: 1px solid rgba( color($colors, secondary), .68 );
  }

</style>