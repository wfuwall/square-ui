import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'

import Row from '@/packages/layout/row.vue'
import Col from '@/packages/layout/col.vue'

describe('row.vue', () => {
  it('1.测试gutter是否ok？', async () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true, // 将组件挂载到浏览器
      stubs: {
        's-col': Col
      },
      slots: {
        default: '<s-col></s-col>'
      },
      propsData: {
        gutter: 20
      }
    })
    expect(getComputedStyle(wrapper.vm.$el).marginLeft).to.eq('-10px')
    expect(getComputedStyle(wrapper.vm.$el).marginRight).to.eq('-10px')
    const col = wrapper.vm.$el.querySelector('.s-col')
    // 测试 col 必须放在下个队列中
    await wrapper.vm.$nextTick()
    expect(getComputedStyle(col).paddingLeft).to.eq('10px')
    expect(getComputedStyle(col).paddingRight).to.eq('10px')
  })

  it('2.测试justify属性', async () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: {
        's-col': Col
      },
      slots: {
        default: '<s-col></s-col>'
      },
      propsData: {
        justify: 'start'
      }
    })
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-start')
    wrapper.setProps({ justify: 'end' })
    await wrapper.vm.$nextTick()
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-end')
    wrapper.setProps({ justify: 'center' })
    await wrapper.vm.$nextTick()
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('center')
    wrapper.setProps({ justify: 'space-between' })
    await wrapper.vm.$nextTick()
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('space-between')
    wrapper.setProps({ justify: 'space-around' })
    await wrapper.vm.$nextTick()
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('space-around')
  })
})
