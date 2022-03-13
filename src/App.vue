<template>
  <main>
    <h1>CSV viewer</h1>
    <CsvPrnParser />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CsvPrnParser from './components/CsvPrnParser.vue'

export default defineComponent({
  name: 'App',
  components: {
    CsvPrnParser
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
