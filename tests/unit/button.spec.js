import { shallowMount } from '@vue/test-utils' // vue 提供的快速测试的方法
import { expect } from 'chai'

import Button from '@/packages/button/Button.vue'
import Icon from '@/packages/Icon.vue'

describe('button.vue', () => {
  // it('1、测试1+1', () => {
  //   // expect(1 + 1).to.eq(2)
  //   // expect(getComputedStyle(document.body).color).to.eq('2')
  // })
  // 可以测试当前组件运行在浏览器的情况
  it('1.测试button能否正常显示slot里的内容', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: '按钮'
      }
    })
    expect(wrapper.text()).to.eq('按钮')
  })
  it('2.测试icon传入是否能正常显示', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        's-icon': Icon // 替换的功能
      },
      propsData: {
        icon: 'edit'
      }
    })
    const icon = wrapper.vm.$el.querySelector('.s-icon')
    // expect(wrapper.find('use').attributes('href')).to.eq('#icon-edit')
    expect(icon.className).contain('icon-edit')
  })
  it('3.测试loading时，按钮是否是禁用状态', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        's-icon': Icon // 替换的功能
      },
      propsData: {
        loading: true
      }
    })
    console.log(wrapper, 11)
    const icon = wrapper.vm.$el.querySelector('.s-icon')
    // expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading')
    expect(icon.className).contain('icon-loading')
    expect(wrapper.classes()).contain('is-disabled') // 判断类名里是否包含 is-disabled 类
  })
  it('4.测试按钮点击是否正常', () => {
    const wrapper = shallowMount(Button, {
      stubs: ['s-icon'], // 不去渲染icon，只是一个假标签
      propsData: {
        icon: 'edit'
      }
    })
    wrapper.find('button').trigger('click') // 给 button 添加一个点击事件
    expect(wrapper.emitted('click').length).to.eq(1) // 判断事件的个数
  })
  it('5.测试按钮传入的iconPosition图标位置是否正常显示', () => { // 测试样式
    const wrapper = shallowMount(Button, {
      attachToDocument: true, // 将组件挂载到浏览器，否则下面取到的 order 是 ''
      stubs: {
        's-icon': Icon
      },
      slots: {
        default: '成功按钮'
      },
      propsData: {
        icon: 'like',
        iconPosition: 'left'
      }
    })
    const span = wrapper.vm.$el.querySelector('span')
    // console.log(wrapper.vm.$el)
    expect(getComputedStyle(span).order).to.eq('2')
    wrapper.setProps({ iconPosition: 'right' }) // 设置 props 后，必须要在下一个事件环去取值
    return wrapper.vm.$nextTick().then(() => {
      expect(getComputedStyle(span).order).to.eq('1')
    })
  })
})
