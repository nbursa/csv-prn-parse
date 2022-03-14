<template>
  <div class="csv-loader">
    <div>
      Load <button @click="loadFile('csv')">CSV</button> or
      <button @click="loadFile('prn')">PRN</button> file
    </div>
    <div class="toggle">
      <h2>
        {{
          `Displaying .${fileFormat} file, ${showHtml ? 'HTML' : 'JSON'} view`
        }}
      </h2>
      <button @click="togglePreview">
        {{ `Show ${showHtml ? 'JSON' : 'HTML'}` }}
      </button>
    </div>
    <div v-if="showHtml" class="data-table">
      <div class="row" v-for="(item, index) in jsonFromFile" :key="index">
        <span
          v-for="(val, col) in item"
          :key="col"
          :class="`column col-${col}`"
          >{{ val }}</span
        >
      </div>
    </div>
    <div v-else>
      <pre>{{ parserContent }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CsvPrnParser',
  props: {
    msg: String
  },
  data () {
    return {
      fileFormat: 'csv',
      showHtml: true,
      content: ['']
    }
  },
  computed: {
    parserContent () {
      return JSON.stringify(this.jsonFromFile, null, 2)
    },
    jsonFromFile () {
      const header = this.content[0]
        .toLowerCase()
        .replaceAll(' ', '_')
        .split(',')
      const output = this.content.slice(1).map((line: string) => {
        let fields: string | string[] | null = null
        if (this.fileFormat === 'csv') {
          fields =
            line &&
            line
              .trim()
              .split('"')
              .filter((n: string) => n)
              .map((item: string) => {
                return item.replace(',', '')
              })
              .join()
              .split(',')
        } else {
          fields = line && line.split(',')
        }
        return Object.fromEntries(
          header.map((h: string, i: number) => [h, fields?.[i]])
        )
      })
      return output
    }
  },
  created () {
    this.loadFile(this.fileFormat)
  },
  methods: {
    loadFile (type: string) {
      this.fileFormat = type
      fetch(`/Workbook2.${type}`)
        .then((response) => {
          const reader = response.body?.getReader()
          return new ReadableStream({
            start (controller) {
              return pump()
              function pump (): Promise<void> | undefined {
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
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) =>
          blob
            .text()
            .then((res) => {
              this.content = res.split('\n')
              if (type === 'prn') {
                const arr = this.content[0].split(' ')
                const poped = [arr.pop()]
                const p1 = arr.slice(0, arr.length - 2).filter((n: string) => n)
                const p2 = arr.slice(arr.length - 2, arr.length)
                const result = [...p1, `${p2[0]} ${p2[1]}`, ...poped]
                this.content[0] = result.join(',')
                const prn = this.content.map((c, i) => {
                  if (i > 0) {
                    const arr = c
                      .split(' ')
                      .join()
                      .replaceAll(',', ' ')
                      .replace(/\s\s+/g, ',')
                      .replace(',', ' ')
                      .split(',')
                    const poped = arr.pop()?.split(' ')
                    poped && arr.push(...poped)
                    const result = arr.join(',')
                    return result
                  }
                  return c
                })
                this.content = prn
              }
            })
            .catch((err) => console.error('blob error: ', err))
        )
        .catch((err) => console.error(err))
    },
    togglePreview () {
      this.showHtml = !this.showHtml
    }
  }
})
</script>

<style scoped lang="scss">
.toggle {
  margin-bottom: 1rem;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .column {
    width: calc(100% / 6);
    text-align: left;
  }
}
pre {
  text-align: left;
}
</style>
