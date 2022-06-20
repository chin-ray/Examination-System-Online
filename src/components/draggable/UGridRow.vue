<template>
  <el-row>
    <el-col :span="12">
      {{ props.propValue }}
      <slot />
    </el-col>
  </el-row>
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

<style lang="scss" scoped>
.el-col {
  border: 1px dashed #336699;
}
</style>
