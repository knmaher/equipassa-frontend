import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToolList from '../tools/ToolList.vue'

const tools = [
  { id: 1, name: 'Hammer', description: 'Steel hammer' },
  { id: 2, name: 'Screwdriver', description: 'Flat head' },
]

describe('ToolList', () => {
  it('renders provided tools', () => {
    const wrapper = mount(ToolList, { props: { tools } })
    expect(wrapper.findAllComponents({ name: 'ToolCard' }).length).toBe(2)
    expect(wrapper.text()).toContain('Hammer')
    expect(wrapper.text()).toContain('Screwdriver')
  })
})
