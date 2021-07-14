<template>
  <div id="app">
    <div class="logo"><img src="./assets/logo.png" alt="QQ音乐"></div>
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import 'assets/reset.css'
import Nav from 'views/Nav'
export default {
  components:{
    Nav
  }
}
</script>

<style>
body{
  padding-top: 0.6rem;
  background-color: #dee2e0;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
