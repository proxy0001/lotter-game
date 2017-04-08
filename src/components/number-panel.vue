<template>
  <div class="number-panel">
    <pool v-on:initialized="initialized" :num="num"></pool>
    <button type="button" class="btn btn-lg btn-danger btn-block">Draw</button>
  </div>
</template>

<script>


let num = 16
// let balls = [ ...Array( num ).keys() ].map( x => ++x )
export default {
  mounted () {
    // console.log( this.$children[0].$watch)
    // this.$children[0].then( () => {
    //   console.log( 111 )  
    // } )
  },
  methods: {
    initialized () {
      console.log('aaaa')
    }
  },
  data () {
    return {
      num: num,
      pool: this.$children[0]
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

  // .buttle {
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: space-around;
  //   align-items: center;
  //   width: 80%;
  //   margin: 0 auto;
  //   margin-bottom: 20px;
  //   border: 1px solid color( $colors, secondary );

  // }

  // .ball {
  //   position: relative;
  //   width: 21%;
  //   margin: 2%;
  //   border-radius: 50%;
  //   background-color: color( $colors, secondary );
  //   overflow: hidden;

  //   &:after {
  //     content: '';
  //     display: block;
  //     margin-top: 100%;
  //   }

  //   .inner {
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 100%;
  //     height: 100%;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     color: color($colors, light);    
  //   }
  // }
</style>