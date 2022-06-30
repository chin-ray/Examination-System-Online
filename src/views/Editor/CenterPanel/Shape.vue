<template>
  <div class="draggable-slot" @dragenter="handleDragEnter">
    <div v-show="isDragInEditor && dragToComponent == props.element" class="drag-line"></div>
  </div>
  <div
    class="shape"
    :class="[isActive && 'active']"
    :draggable="true"
    @dragstart="handleDragStart"
    @mousedown="handleMouseDownOnShape"
  >
    <slot></slot>
    <div v-show="isActive" class="component-handler px">{{ props.element.label }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { mainStore } from '@/store'
const store = mainStore()

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

const isActive = computed(() => props.active && !props.element.isLock)
const isDragInEditor = computed(() => store.isDragInEditor)
const dragToComponent = computed(() => store.dragToComponent)

// 点击外层包裹组件
const handleMouseDownOnShape = (e) => {
  store.setInEditorStatus(true)

  store.setClickComponentStatus(true)

  // e.preventDefault()
  e.stopPropagation()
  store.hideContextMenu()
  store.setCurComponent({ component: props.element, index: props.index })
  if (props.element.isLock) return
}

// 拖拽开始
const handleDragStart = () => {
  store.setDragToComponent(props.element)
  store.setIsDragInEditor(true)
  // store.hideDragComponent()
  store.hideContextMenu()
}
// 拖拽进入可放置区域
const handleDragEnter = () => {
  store.setDragToComponent(props.element)
}
</script>

<style lang="scss" scoped>
.shape {
  // position: absolute;
  position: relative;
  width: 100%;
  height: 100%;
  // margin-bottom: 1px;

  &:hover {
    cursor: pointer; //move
  }

  &.active {
    outline: 1px solid #409eff;
    user-select: none;
  }
}
.component-handler {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  background-color: #409eff;
  outline: 1px solid #409eff;
  z-index: 1;
  cursor: default;

  position: absolute;
  bottom: -21px;
  left: 0;
}
.draggable-slot {
  width: 100%;
  height: 12px;
  padding: 4px 0;
  .drag-line {
    width: 100%;
    height: 4px;
    background-color: #409eff;
  }
}
</style>
