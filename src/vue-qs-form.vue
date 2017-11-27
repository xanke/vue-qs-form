<template>
  <div>
    <div v-show="step == index" v-for="(item, index) in data" :key="index" >
      <div class="xk-qs-form-body">
        <p class="xk-qs-title">{{item.title}}</p>
        <el-radio-group @change="onClickRadioHander" class="xk-qs-radio-group" v-model="form[item.key]"> 
          <el-radio  class="xk-qs-radio-item" :key="index" :label="index + ',' + iItem[0]" v-for="(iItem, index) in item.radios">{{iItem[1]}}</el-radio> 
        </el-radio-group>
      </div>
      <div class="xk-qs-form-footer">
        <el-button class="xk-qs-btn-left" type="default" @click="onPrevHander">{{prevBtnText}}</el-button>
        <el-button v-if="stepNow != stepLength" class="xk-qs-btn-right" type="primary" @click="onNextHander">{{nextBtnText}}</el-button>
        <el-button v-if="stepNow == stepLength" class="xk-qs-btn-right" type="primary" @click="onFinishHander">{{finishBtnText}}</el-button>
        <el-progress class="xs-qs-progress" :text-inside="true" :stroke-width="10" :percentage="percentage" status="success"></el-progress>
      </div>
    </div>
  </div>
</template>

<style>
  .xk-qs-title {
    color: #000;
    font-weight: block;
  }
  .xk-qs-radio-item {
    display: block !important;
    margin-left: 0px !important;
  }
  .xk-qs-radio-item:hover {
    background-color: rgba(250, 250, 250);
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

<script>
  export default {
    name: 'vue-qs-form',
    props: {
      data: {
        required: true,
        default: '',
        type: [Array, Object],
      },
      prevBtnText: {
        default: '上一步',
        type: String,
      },
      nextBtnText: {
        default: '下一步',
        type: String,
      },
      finishBtnText: {
        default: '完成',
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
        return parseInt(this.stepNow / this.stepLength * 100)
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
      },
      // 点击上一部
      onPrevHander () {
        let step = this.step
        if (step > 0) {
          this.step --
        }
      },
      // 点击完成
      onFinishHander () {
        this.$emit('finish')
      },
      onClickRadioHander() {
        if (this.autoNext) {
          setTimeout (() => {
            this.onNextHander()
          }, 500)
        }
      }
    },
    watch: {
      form (nVal, oVal) {
        this.$emit('input', this.form)
      }
    },
    mounted () {
      if (this.value) {
        this.form = this.value
      }
    }
  }
</script>
