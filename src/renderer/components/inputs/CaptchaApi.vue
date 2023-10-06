<template>
  <v-text-field
    v-model="value"
    small
    solo
    background-color="#262626"
    color="#787878"
    :placeholder="placeholder"
    loader-height="35"
    class="home-generalColor eye"
    :type="show ? 'text' : 'password'"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    @change="onUpdate"
    @click:append="show = !show"
  />
</template>

<script>
export default {
  name: 'CaptchaApi',
  props: {
    label: {
      type: String,
      required: true,
    },
    initValue: {
      type: String,
      required: false,
    },
    setenabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    ruleArray: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: true,
      value: this.initValue ?? '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 25 || 'Min 25 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    onUpdate(event) {
      this.$emit('updated', { value: this.value });
    },
  },
};
</script>

<style scoped></style>
