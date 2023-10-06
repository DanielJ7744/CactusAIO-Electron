<template>
  <div>
    <v-select
      v-model="selected"
      item-text="name"
      item-value="name"
      :items="opts"
      :label="label"
      color="#c4c4c4"
      item-color="#a1b5b1"
      solo
      flat
      dark
      :rules="rules"
      :disabled="isDisabled"
      :menu-props="{ dark: true, offsetY: true }"
      :multiple="true"
      @change="onUpdate"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'InputBoxMultiSelect',
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
      type: Array,
      required: false,
      default: []
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    ruleArray: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      selectedIndex: this.$props.defaultSelected || [],
      selected: [],
      selfChanged: false
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
    this.selected = []
    this.selectedIndex.forEach(i => {
      this.selected.push(this.opts[i])
    })
  },
  methods: {
    onUpdate (val) {
      console.log(val)
      const indices = []
      val.forEach(i => {
        indices.push(
          _.findIndex(this.options, o => {
            return i === o.name
          })
        )
      })
      console.log('Selected: ' + indices)
      console.log('Update called on ' + this.label)
      console.log('Updated to ' + this.selected)
      this.selfChanged = true
      this.$emit('updated', { selectedIndex: indices })
    },
    initChangeCallback () {
      if (this.selfChanged) {
        this.selfChanged = false
        return
      }
      this.selectedIndex = this.$props.defaultSelected
      // this.opts = this.$props.options;
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
#task-input-select-label {
  font-size: 3vh;
}
#task-input-select {
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
