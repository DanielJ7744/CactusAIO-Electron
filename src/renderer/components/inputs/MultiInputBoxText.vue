<template>
  <div id="task-input-text-container">
    <div class="text-field-container">
      <v-text-field
        v-model="value1"
        dark
        large
        small
        solo
        :label="label1"
        :rules="rules1"
        color="#c4c4c4"
        class="shrink"
        @change="onUpdate"
      />
    </div>
    <div class="text-field-container">
      <v-text-field
        v-model="value2"
        dark
        large
        small
        solo
        :label="label2"
        :rules="rules2"
        color="#c4c4c4"
        class="shrink"
        @change="onUpdate"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputBoxText',
  props: {
    label1: {
      type: String,
      required: true
    },
    label2: {
      type: String,
      required: true
    },
    ruleArray1: {
      type: Array,
      required: false,
      default: () => []
    },
    ruleArray2: {
      type: Array,
      required: false,
      default: () => []
    },
    initValue1: {
      type: String,
      required: false
    },
    initValue2: {
      type: String,
      required: false
    },
    includeFormat: {
      type: String,
      required: false
    },
    excludeFormat: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      value1: this.$props.initValue1 ? this.$props.initValue1 : '',
      value2: this.$props.initValue2 ? this.$props.initValue2 : '',
      rules1: this.$props.ruleArray1 ?? [],
      rules2: this.$props.ruleArray2 ?? [],
      selfChanged: false,
      exclude: this.$props.excludeFormat
        ? new RegExp(this.$props.excludeFormat, 'g')
        : null
    }
  },
  watch: {
    initValue1 () {
      this.initChangeCallback()
    },
    initValue2 () {
      this.initChangeCallback()
    }
  },
  methods: {
    onUpdate (event) {
      this.$emit('updated', { value1: this.value1, value2: this.value2 })
    },
    keyupFormat () {
      if (this.exclude) {
        this.value1 = this.value1.replace(this.exclude, '')
        this.value2 = this.value2.replace(this.exclude, '')
      }
    },
    initChangeCallback () {
      if (!this.selfChanged) {
        this.value1 = this.$props.initValue1
        this.value2 = this.$props.initValue2
      } else {
        this.selfChanged = false
      }
    }
  }
}
</script>

<style scoped>
#task-input-text-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  /* justify-content: space-evenly; */
}
.text-field-container {
  width: 100%;
}
#task-input-text-label {
  font-size: 3vh;
}
#task-input-text {
  border: 1px solid grey;
  font-size: 3vh;
  height: 6vh;
  width: 10vw;
  position: absolute;
  background-color: #c4c4c4;
  font-family: 'Roboto', sans-serif;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
