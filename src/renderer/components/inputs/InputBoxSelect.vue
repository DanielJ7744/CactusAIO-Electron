<template>
  <div id="input-select-container">
    <v-select
      id="selectBox"
      v-model="selected"
      solo
      flat
      item-text="name"
      item-value="name"
      :items="options"
      :label="label"
      color="#c4c4c4"
      item-color="#a1b5b1"
      background-color="#262626"
      dark
      :rules="rules"
      :menu-props="{ dark: true, offsetY: true, maxHeight: '400' }"
      @change="onUpdate"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'InputBoxSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    defaultSelected: {
      type: Number,
      required: false,
      default: 0
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
    }
  },
  data () {
    return {
      selectedIndex: this.$props.defaultSelected || 0,
      selected: ''
    }
  },
  computed: {
    opts () {
      return this.$props.options
    },
    rules () {
      return this.$props.ruleArray
    }
  },
  watch: {
    defaultSelected () {
      this.initChangeCallback()
    },
    options () {
      this.initChangeCallback()
    }
  },
  mounted () {
    this.selected = this.$props.options[this.$props.defaultSelected]
  },
  methods: {
    onUpdate () {
      console.log('Update called on ' + this.label)
      console.log('Updated to ' + this.selected)
      this.$emit('updated', {
        selectedIndex: _.findIndex(this.opts, o => {
          return o.name === this.selected
        })
      })
    },
    initChangeCallback () {
      this.selectedIndex = this.$props.defaultSelected
      this.selected = this.opts[this.selectedIndex]
      console.log(
        'Selected Index for ' +
        this.label +
        ' changed to ' +
        this.$props.defaultSelected +
        ' -> ' +
        this.selectedIndex
      )
    }
  }
}
</script>

<style scoped>
#input-select-container{
  width: 100%;
}
</style>
