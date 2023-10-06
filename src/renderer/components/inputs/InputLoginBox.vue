<template>
  <div class="custom-input-search-container">
    <v-text-field
      v-model="value"
      small
      color="#fff"
      placeholder="license key"
      loader-height="35"
      :type="type"
      class="global-input justify-center"
      @change="onUpdate"
      @keyup="keyupFormat"
    />
  </div>
</template>

<script>
export default {
  name: 'InputLoginBox',
  props: {
    initValue: {
      type: String,
      required: false,
    },
    includeFormat: {
      type: String,
      required: false,
    },
    excludeFormat: {
      type: String,
      required: false,
    },
    setenabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    ruleArray: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
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
      rules: this.$props.ruleArray,
    };
  },
  watch: {
    initValue() {
      this.initChangeCallback();
    },
    setenabled() {
      this.enabledChangeCallback();
    },
  },
  methods: {
    onUpdate(event) {
      this.$emit('updated', { value: this.value });
    },
    keyupFormat() {
      if (this.exclude) {
        this.value = this.value.replace(this.exclude, '');
      }
    },
    initChangeCallback() {
      console.log(
        'Change callback from ' + this.value + ' to ' + this.$props.initValue,
      );
      if (!this.selfChanged) {
        this.value = this.$props.initValue;
      } else {
        this.selfChanged = false;
      }
    },
    enabledChangeCallback() {
      this.enabled = this.$props.setenabled;
    },
  },
};
</script>

<style scoped>
.custom-input-login-container {
  color: white !important;
}
</style>
