<template>
  <div id="multiline-input-container">
    <!--    <label id="multiline-input-label" for="multiline-input">{{ $props.label }}</label>-->
    <v-textarea
      v-model="value"
      dark
      color="c4c4c4"
      dense
      no-resize
      height="100%"
      solo
      :label="label"
      :rules="rules"
      placeholder="Enter Proxies"
      :disabled="!enabled"
      @change="onUpdate"
    />
  </div>
</template>

<script>
export default {
  name: 'InputProxytextArea',
  props: {
    label: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    setenabled: {
      type: Boolean,
      required: false,
      default: true
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      value: this.$props.values.join('\n'),
      enabled: this.$props.setenabled
    }
  },
  watch: {
    values () {
      this.valuesChangeCallback()
    },
    setenabled () {
      this.enabled = this.$props.setenabled
    }
  },
  mounted () {
    this.value = this.$props.values.join('\n')
  },
  methods: {
    onUpdate () {
      this.$emit('updated', { value: this.value.trim().split('\n') })
    },
    valuesChangeCallback () {
      this.value = this.$props.values.join('\n')
    }
  }
}
</script>

<style scoped>
#multiline-input {
  width: 84vw;
  height: 60vh;
  background-color: #c4c4c4;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  border: 1px solid grey;
  resize: none;
  overflow: hidden;
  overflow-y: scroll;
}
#multiline-input-container {
  /* font-size: 3vh; */
  font-family: 'Montserrat', sans-serif;
  height: 100%;
  width: 100%;
}
#multiline-input-label {
  color: #787878;
}
::-webkit-scrollbar {
  width: 1px; /* Remove scrollbar space */
  background: red; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
  width: 1px;
  color: green;
}
</style>
