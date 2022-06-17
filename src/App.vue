<template>
  <h1>
    <calculate/>
    <map-model/>
  </h1>

</template>

<script>
import calculate from './components/calculate.vue'
import MapModel from './components/map-model.vue'

export default {
  name: 'App',
  components: {
    calculate,
    MapModel
  },
  created () {
    document.title=" 5G高铁精准规划辅助工具"
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
