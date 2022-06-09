<template>
  <div class="shape" :class="state.active && 'active'" @click="selectCurComponent">
    <div v-for="item in isActive() ? pointList : []" :key="item" class="shape-point"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  element: {
    require: true,
    type: Object,
    default: () => {}
  },
  defaultStyle: {
    require: true,
    type: Object,
    default: () => {}
  },
  index: {
    require: true,
    type: [Number, String],
    default: 0
  }
})

const state = reactive({
  pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
  initialAngle: {
    // 每个点对应的初始角度
    lt: 0,
    t: 45,
    rt: 90,
    r: 135,
    rb: 180,
    b: 225,
    lb: 270,
    l: 315
  },
  angleToCursor: [
    // 每个范围的角度对应的光标
    { start: 338, end: 23, cursor: 'nw' },
    { start: 23, end: 68, cursor: 'n' },
    { start: 68, end: 113, cursor: 'ne' },
    { start: 113, end: 158, cursor: 'e' },
    { start: 158, end: 203, cursor: 'se' },
    { start: 203, end: 248, cursor: 's' },
    { start: 248, end: 293, cursor: 'sw' },
    { start: 293, end: 338, cursor: 'w' }
  ],
  cursors: {}
})

const isActive = () => {
  return state.active && !state.element.isLock
}
// 阻止向父组件冒泡
const selectCurComponent = (e) => {
  e.stopPropagation()
  e.preventDefault()
  // store.hideContextMenu()
}

watchEffect(() => {
  state.active = props.active
  state.element = props.element
  state.defaultStyle = props.defaultStyle
  state.index = props.index
})
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}

.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
