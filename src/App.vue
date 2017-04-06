<template>
  <div id="app">
    <header class="header">
      <h3> {{title}} </h3>
      <p> {{description}} </p>
    </header>
    
    <section id="draw" class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <p>Number Panel</p>
        </div>
        <div class="col-md-4">
          <p>History Panel</p>
        </div>
      </div>  
    </section>
    <section id="chart">
      <p>Chart Panel</p>
    </section>

       <!--<template v-for="variant in ['primary','secondary','success','outline-success','warning','danger','link']">
        <div class="col-md-4 pb-2" v-for="size in ['sm','','lg']">
          <b-button :size="size" :variant="variant" href="">
            {{variant}} {{size}}
          </b-button>
        </div>
      </template>-->   
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Lotter game',
      description: 'vue2 + bootstrap4',
    }
  }
}
</script>

<style lang="scss">
  @import "./App.scss";
</style>
