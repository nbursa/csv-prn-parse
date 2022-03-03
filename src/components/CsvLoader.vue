<template>
  <div class="csv-loader">
    <div class="row" v-for="(item, index) in jsonFromCsv" :key="index">
      <span v-for="(val, col) in item" :key="col" :class="`column col-${col}`" >{{ val }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CsvLoader',
  props: {
    msg: String
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    jsonFromCsv () {
      const lines = this.content.split('\n')
      const header = lines[0].toLowerCase().replaceAll(' ', '_').split(',')
      const output = lines.slice(1).map((line: any) => {
        const fields = line && line.trim().split('"').filter((n: any) => n).map((item: any) => {
          return item.replace(',', '')
        }).join().split(',')
        return Object.fromEntries(header.map((h: any, i: any) => [h, fields[i]]))
      })
      // console.log('output: ', output)
      return output
    }
  },
  created () {
    const fileContent = fetch('/Workbook2.csv')
      .then(response => {
        const reader = response.body?.getReader()
        return new ReadableStream({
          start (controller) {
            return pump()
            function pump (): any {
              return reader?.read().then(({ done, value }) => {
                if (done) {
                  controller.close()
                  return
                }
                controller.enqueue(value)
                return pump()
              })
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => blob.text().then(res => { this.content = res }).catch(err => console.error('blob error: ', err)))
      .catch(err => console.error(err))
  }
})
</script>

<style scoped lang='scss'>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .column {
    width: calc(100% / 6);
    text-align: left;
  }
}
</style>
