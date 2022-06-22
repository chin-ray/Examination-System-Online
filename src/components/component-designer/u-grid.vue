<template>
  <el-row>
    <el-col v-for="(item, index) in props.element.cols" :key="item.id" :span="item.options.span">
      <Shape :active="item.id === (curComponent || {}).id" :element="item" :index="index">
        <slot />
      </Shape>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed } from 'vue'
import Shape from '@/views/Editor/CenterPanel/Shape.vue'
import { mainStore } from '@/store'
const store = mainStore()

const curComponent = computed(() => store.curComponent)

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
console.log(props.element)
</script>

<style lang="scss" scoped>
.el-row {
  padding: 4px;
  border: 1px dashed #33669965;

  .el-col {
    height: 40px;
    border: 1px dashed #33669965;
  }
}
</style>
