<template>
  <div>
    <div v-show="step == index" v-for="(item, index) in data" :key="index" >
      <div>
        <p class="title">{{item.title}}</p>
        <el-radio-group v-model="form[item.key]"> 
          <el-radio :key="index" :label="index + ',' + iItem[0]" v-for="(iItem, index) in item.radios">{{iItem[1]}}</el-radio> 
        </el-radio-group>
      </div>
      <div>
        <el-button type="default" @click="onPrevHander">{{prevBtnText}}</el-button>
        <el-button type="primary" @click="onNextHander">{{nextBtnText}}</el-button>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" status="success"></el-progress>
      </div>
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
    prevBtnText: {
      default: '上一步',
      type: String,
    },
    nextBtnText: {
      default: '下一步',
      type: String,
    },
    value: {
      default: '',
      required: true,
      type: [Object, String, Array]
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
    }
  },
  watch: {
    form (nVal) {
      this.$emit('input', nVal)
    }
  },

  mounted () {
    if (this.value) {
      this.form = this.value
    }
    // this.init()
    console.log(this.form)
  }
}
</script>
