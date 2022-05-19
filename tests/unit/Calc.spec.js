import { mount } from '@vue/test-utils'
import Calc from './../../src/pages/Calc.vue'

test('Add new Siryo Calc', async () => {
  const wrapper = mount(Calc)
  expect(wrapper.findAll('[data-test="calc-siryo"]')).toHaveLength(0)

  await wrapper.get('[data-test="new-calc-siryo"]').trigger('add-new-calc')

  expect(wrapper.findAll('[data-test="calc-siryo"]')).toHaveLength(1)
})