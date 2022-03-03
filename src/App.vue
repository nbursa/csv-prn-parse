<template>
  <main>
    <h1>CSV viewer</h1>
    <CsvPrnLoader />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CsvPrnLoader from './components/CsvPrnLoader.vue'

export default defineComponent({
  name: 'App',
  components: {
    CsvPrnLoader
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
