<template>
  <div class="custom-input-text-container">
    <v-text-field
      v-model="value"
      small
      solo
      :label="label"
      :type="type"
      color="#787878"
      :placeholder="placeholder"
      background-color="#262626"
      :disabled="!enabled"
      :rules="rules"
      class="home-generalColor"
      @change="onUpdate"
      @keyup="keyupFormat"
    />
  </div>
</template>

<script>
export default {
  name: 'InputBoxText',
  props: {
    label: {
      type: String,
      required: true
    },
    initValue: {
      type: String | Number,
      required: false
    },
    includeFormat: {
      type: String,
      required: false
    },
    excludeFormat: {
      type: String,
      required: false
    },
    setenabled: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    ruleArray: {
      type: Array,
      required: false,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: this.$props.initValue ? this.$props.initValue : '',
      selfChanged: false,
      exclude: this.$props.excludeFormat
        ? new RegExp(this.$props.excludeFormat, 'g')
        : null,
      include: this.$props.includeFormat
        ? new RegExp(this.$props.includeFormat, 'g')
        : null,
      enabled: this.$props.setenabled,
      rules: this.$props.ruleArray
    }
  },
  watch: {
    initValue () {
      this.initChangeCallback()
    },
    setenabled () {
      this.enabledChangeCallback()
    }
  },
  methods: {
    onUpdate (event) {
      this.$emit('updated', { value: this.value })
    },
    keyupFormat () {
      if (this.exclude) {
        this.value = this.value.replace(this.exclude, '')
      }
    },
    initChangeCallback () {
      console.log(
        'Change callback from ' + this.value + ' to ' + this.$props.initValue
      )
      if (!this.selfChanged) {
        this.value = this.$props.initValue
      } else {
        this.selfChanged = false
      }
    },
    enabledChangeCallback () {
      this.enabled = this.$props.setenabled
    }
  }
}
</script>

<style>
.custom-input-text-container {
  padding: 0px;
  width: 100%;
}
.input-text-label {
  font-size: 3vh;
}
.custom-input-text {
  border: 1px solid grey;
  font-size: 3vh;
  height: 6vh;
  width: 21vw;
  position: absolute;
  background-color: #c4c4c4;
  font-family: 'Roboto', sans-serif;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
