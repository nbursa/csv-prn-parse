import { mount } from '@vue/test-utils'
import CsvPrnParser from '@/components/CsvPrnParser.vue'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe('CsvPrnParser.vue', () => {
  it('renders document data', () => {
    const wrapper = mount(CsvPrnParser)
    expect(wrapper.get('.data-table').isVisible()).toBe(true)
  })
})
