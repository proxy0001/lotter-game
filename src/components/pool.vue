<template>
  <transition appear name="fade">
    <div class="pool">
      <ball v-for="(value, index) in values" :value="value" :order="index"></ball>
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
  created () {
    console.log( this.$options.name + ': created' )

  },
  mounted () {
    console.log( this.$options.name + ': mounted')
    this.height
    this.showBalls()
    // this.init()
  },  
  destoryed () {
    console.log( this.$options.name + ': destoryed')
  },
  computed: {
    height () {
      let height = Math.ceil( this.$props.num / this.$props.cols ) * this.$el.offsetWidth / this.$props.cols
      this.$el.style.height = height + 'px'
      return height
    },
    values () {
      // to create balls
      return [ ...Array( this.$props.num ).keys() ].map( x => ++x ).sort( () => .5 - Math.random() )
      // return [ ...Array( this.$props.num ).keys() ].map( x => ++x )
    }
  },
  methods: {
    initialized () {
      this.isInit = true
      this.$emit('initialized')
    },
    showBalls ( n = 0 ) {
      // let time = 50
      // this.$children.forEach( ( x, y ) => setTimeout( () => x.show(), time * y ) )    
      if ( n < this.$props.num ) {
        this.showBall( n )
        setTimeout( () => this.showBalls( ++n ) , 50)
      }else {
        this.initialized()
      }
    },
    showBall ( n ) {
      this.$children[n].show()
    },
    hideBall ( n ) {
      this.$children[n].hide()
    }
  },
  data () {
    return {
      isInit: false,
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>