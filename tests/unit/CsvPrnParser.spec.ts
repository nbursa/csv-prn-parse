import { mount } from '@vue/test-utils'
import CsvPrnParser from '@/components/CsvPrnParser.vue'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe('CsvPrnParser.vue', () => {
  it('renders csv data', () => {
    const wrapper = mount(CsvPrnParser)
    expect(wrapper.get('.data-table').isVisible()).toBe(true)
    expect(wrapper.get('.toggle button').text()).toContain('Show JSON')
  })
  it('renders prn data', () => {
    const wrapper = mount(CsvPrnParser, {
      data () {
        return {
          fileFormat: 'prn'
        }
      }
    })
    expect(wrapper.get('.data-table').isVisible()).toBe(true)
    expect(wrapper.get('.toggle button').text()).toContain('Show JSON')
  })
})
