# vue-qs-form
Vue quick step form, Vue快速问卷表单

[![npm](https://img.shields.io/npm/v/vue-qs-form.svg)](https://www.npmjs.com/package/vue-qs-form)
[![npm](https://img.shields.io/npm/dt/vue-qs-form.svg)](https://www.npmjs.com/package/vue-qs-form)
[![npm](https://img.shields.io/npm/dm/vue-qs-form.svg)](https://www.npmjs.com/package/vue-qs-form)
[![Build Status](https://travis-ci.org/xanke/vue-qs-form.svg?branch=master)](https://travis-ci.org/xanke/vue-qs-form)
[![Codecov](https://img.shields.io/codecov/c/github/xanke/vue-qs-form.svg)](https://codecov.io/gh/xanke/vue-qs-form)
[![npm](https://img.shields.io/npm/l/vue-qs-form.svg)](http://opensource.org/licenses/MIT)

****需配合element-ui使用 https://github.com/elemefe****


## 快速开始
```js
import Vue from 'vue'
import vueQsForm from 'vue-qs-form'

export default {
  name: 'App',

  components: {
    vueQsForm
  }
}
```

## 示例
```vue
<template>
  <vueQsForm v-model="form" :data="data" @finish="submitForm"></vueQsForm>
</template>

<script>
import vueQsForm from 'vue-qs-form'

export default {
  name: 'App',
  components: {
    vueQsForm
  },

  data: () => ({
    form: '',
    data: [
      {
        'key': 'qa1',
        'title': '问题一',
        'radios': [
          [0, '否'],
          [1, '是']
        ]
      },
      {
        'key': 'qa2',
        'title': '问题二',
        'radios': [
          [0, '否'],
          [1, '是']
        ]
      }
    ]
  }),
}
</script>
```

## Props
|参数|说明|必须|类型|可选值|默认值|
|-----|-----------|--------|----|----|-------|
|data|表单数据|是|String|—|—|
|height|表单高度|否|String|—|250px|
|autoNext|是否自动下一步|否|Boolean|true/false|false|
|prevBtnText|上一步按钮文字|否|String|—|上一步|
|nextBtnText|下一步按钮文字|否|String|—|下一步|
|submitBtnText|完成按钮文字|否|String|—|提交|

## Event
|事件名称|说明|回调参数|
|-----|-----------|--------|
|submit|点击提交事件|表单数据|
|atend|到达最后|-|

## Function
|方法名称|说明|回调参数|
|-----|-----------|--------|
|restForm|重置表单|-|

## License

Vue-qs-form is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)