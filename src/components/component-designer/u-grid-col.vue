<template>
  <el-col :span="props.element.options.span">
    1
    <slot />
  </el-col>
</template>

<script setup>
const props = defineProps({
  element: {
    type: Object,
    default: () => {}
  }
})
console.log(props.element)
</script>

<style lang="scss" scoped>
.el-col {
  height: 40px;
  width: 100px;
  border: 1px dashed #33669965;
}
</style>
