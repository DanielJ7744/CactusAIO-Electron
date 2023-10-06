<template>
  <div class="task-input-text-container">
    <v-checkbox
      v-model="value"
      dark
      large
      color="#c4c4c4"
      :label="label"
      @change="onUpdate"
    />
  </div>
</template>

<script>
export default {
  name: 'InputBoxCheck',
  props: {
    label: {
      type: String,
      required: true
    },
    initValue: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      value: this.$props.initValue,
      selfChanged: false
    }
  },
  watch: {
    initValue () {
      this.initChangeCallback()
    }
  },
  methods: {
    onUpdate (event) {
      this.$emit('updated', { value: this.value })
    },
    initChangeCallback () {
      if (!this.selfChanged) {
        this.value = this.$props.initValue
      } else {
        this.selfChanged = false
      }
    }
  }
}
</script>

<style scoped>
.task-input-text-container {
  width: 100%;
}
</style>
