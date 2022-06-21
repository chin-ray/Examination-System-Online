<template>
  <el-button>{{ props.propValue }}</el-button>
</template>

<script setup>
const props = defineProps({
  propValue: {
    type: String,
    require: true,
    default: ''
  },
  element: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped></style>
