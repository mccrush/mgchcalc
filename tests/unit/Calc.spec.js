import { mount } from '@vue/test-utils'
import Calc from '@/views/Calc.vue'

test('renders a head', () => {
  const wrapper = mount(Calc)

  const head = wrapper.get('[data-test="block-head"]')

  expect(head.text()).toBe('Материалы')
})