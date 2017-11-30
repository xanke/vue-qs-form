/* eslint-env mocha */
import Vue  from 'vue'
import ElementUI from 'element-ui'
import { expect } from 'chai'
import { mount } from 'avoriaz'
import vueQsForm from '@/vue-qs-form'

Vue.use(ElementUI)

describe('vue-birthday-input.vue', () => {
  it('data测试', () => {
    let data = [
      {
        key: 'qa1',
        title: '问题一',
        radios: [
          [0, '否'],
          [1, '是']
        ]
      },
      {
        key: 'qa2',
        title: '问题二',
        radios: [
          [0, '否'],
          [1, '是']
        ]
      }
    ]
    const wrapper = mount(vueQsForm, { propsData: { data: data }})
    let ret = JSON.stringify(wrapper.data().form)

    expect(ret).to.equal('{"qa1":"","qa2":""}')
  })

})
