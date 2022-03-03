<template>
  <main>
    <h1>CSV</h1>
    <CsvLoader :msg="'prop content'" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CsvLoader from './components/CsvLoader.vue'

export default defineComponent({
  name: 'App',
  components: {
    CsvLoader
  },
  mounted () {
    console.log('mounted csv component: ', this)
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
