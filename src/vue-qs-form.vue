<template>
  <div>
    <div class="xk-qs-form-body" :style="'height: ' + height">
      <transition-group name="el-fade-in-linear">
        <div class="xk-qs-form-item" v-show="step == index" v-for="(item, index) in data" :key="index" >
          <p class="xk-qs-title">{{item.title}}</p>
          <div @click.once="onClickRadioHander">
            <el-radio-group class="xk-qs-radio-group" v-model="form[item.key]"> 
              <el-radio class="xk-qs-radio-item" :key="index" :label="index + ',' + iItem[0]" v-for="(iItem, index) in item.radios">{{iItem[1]}}</el-radio> 
            </el-radio-group>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="xk-qs-form-footer">
      <el-button class="xk-qs-btn-left" type="default" @click="onPrevHander">{{prevBtnText}}</el-button>
      <el-button v-if="stepNow != stepLength" class="xk-qs-btn-right" type="primary" @click="onNextHander">{{nextBtnText}}</el-button>
      <el-button v-if="stepNow == stepLength" class="xk-qs-btn-right" type="primary" @click="onSubmitHander">{{submitBtnText}}</el-button>
      <el-progress class="xs-qs-progress" :text-inside="true" :stroke-width="5" :percentage="percentage"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-qs-form',
  props: {
    data: {
      required: true,
      default: '',
      type: [Array, Object],
    },
    height: {
      default: '250px',
      type: String
    },
    prevBtnText: {
      default: '上一步',
      type: String,
    },
    nextBtnText: {
      default: '下一步',
      type: String,
    },
    submitBtnText: {
      default: '提交',
      type: String,
    },
    value: {
      default: '',
      required: true,
      type: [Object, String, Array]
    },
    autoNext: {
      default: true,
      type: Boolean
    }
  },
  data : () => ({
    step: 0,
    form: {}
  }),
  computed: {
    stepLength () {
      return this.data.length
    },
    stepNow () {
      return this.step + 1
    },
    percentage () {
      let percentage = parseInt(this.stepNow / this.stepLength * 100) || 0
      return percentage
    }
  },
  methods: {
    // 点击下一步
    onNextHander () {
      this.$emit('input', this.form)
      let stepNow = this.stepNow
      if (stepNow < this.stepLength) {
        this.step ++
      }
      if (stepNow == this.stepLength) {
        this.$emit('atend')
      }
    },
    // 点击上一部
    onPrevHander () {
      let step = this.step
      if (step > 0) {
        this.step --
      }
    },
    // 点击完成
    onSubmitHander () {
      this.$emit('submit')
    },
    // 到达最后
    onAtendHander () {
      this.$emit('atend')
    },
    onClickRadioHander() {
      if (this.autoNext) {
        setTimeout(() => {
          this.onNextHander()
        }, 500)
      }
    },
    //重置表单
    resetForm() {
      this.form = this.valueInit()
    },
    //表单初始化
    valueInit() {
      let form = {}
      this.data.forEach((item) => {
        form[item.key] = ''
      })
      return form
    }
  },
  watch: {
    form (nVal, oVal) {
      this.$emit('input', this.form)
    }
  },
  mounted () {
    let value = this.value
    let form  = this.valueInit()
    if (JSON.stringify(value) == "{}") {
      this.form = form
    } else {
      this.form = Object.assign(form, value)
    }
  }
}
</script>

<style>
  .xk-qs-form-body{
    position: relative;
    overflow: auto;
  }
  .xk-qs-form-item{
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .xk-qs-title {
    color: #000;
    font-weight: block;
  }
  .xk-qs-radio-group{
    width: 100% !important;
  }
  .xk-qs-radio-item {
    display: block !important;
    margin-left: 0px !important;
    width: 100% !important;
    margin-bottom:  0px !important;
    padding: 12px 10px;
  }
  .xk-qs-radio-item:hover {
    background-color: rgb(245, 245, 245) !important;
  }
  .xk-qs-radio-item .el-radio__label{
    white-space: normal !important;
    display: inline-block;
    line-height: 1.5;
    padding-left: 25px;
  }
  .xk-qs-radio-item .el-radio__input{
    height: 14px;
    position: absolute;
    top: 50%;
    margin-top: -7px;
  }
  .xk-qs-form-footer {
    margin-top: 45px;
  }
  .xk-qs-btn-left{
    float: left;
  }
  .xk-qs-btn-right{
    float: right;
  }
  .xs-qs-progress{
    display: inline;
  }
  .xs-qs-progress .el-progress-bar__innerText{
    display: none !important;
  }
</style>