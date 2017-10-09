<template>
  <b-container fluid>
    <div id="app">
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'app',
  created(){
    console.log('in app.vue .');

    this.$on('test', function(data){
      console.log(data);
    });
  }
}
</script>

<style>
app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
