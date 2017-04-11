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
    },    
    wiggleColorOfBalls () {
      this.balls.forEach( item => item.color = ( Math.random() * 100 | 0 ) % 3 )
      return this
    },
    wiggleValueOfBalls () {
      this.balls.forEach( item => item.value = ( Math.random() * 100 | 0 ) % 16 + 1 )
      return this
    },    
    wigglePositionOfBalls () {
      this.$children.forEach( item => {
        let x = ( Math.random() * 100 | 0 ) % 10 - 5
        let y = ( Math.random() * 100 | 0 ) % 10 - 5
        item.$el.style.transform = `translate( ${x}px, ${y}px )`
      })
      return this
    },
    saveBalls () {
      this._balls = this.balls.map( x => Object.assign( {}, x ) )
    },
    resetBalls () {
      this.balls = this._balls.map( x => Object.assign( {}, x ) )
      this.$children.forEach( item => {
        item.$el.style.transform = `translate( 0px, 0px )`
      })
      return this
    },
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