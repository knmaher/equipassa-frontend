import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EqButton from '../common/EqButton.vue'

describe('EqButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(EqButton, {
      slots: { default: 'Test Button' },
    })

    expect(wrapper.text()).toContain('Test Button')
    expect(wrapper.classes()).toContain('bg-equipassa-primary')
  })

  it('emits click events', async () => {
    const wrapper = mount(EqButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
