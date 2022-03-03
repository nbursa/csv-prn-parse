<template>
  <div class="csv-loader">
    {{msg}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CsvLoader',
  props: {
    msg: String
  }
})
</script>

<style scoped lang="scss">

</style>
