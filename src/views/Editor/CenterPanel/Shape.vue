<template>
  <div class="shape" :class="[isActive && 'active']" @mousedown="handleMouseDownOnShape">
    <slot></slot>
    <div v-show="isActive" class="component-handler px">{{ props.element }}</div>
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

// 点击外层包裹组件
const handleMouseDownOnShape = (e) => {
  store.setInEditorStatus(true)
  store.setClickComponentStatus(true)

  e.preventDefault()
  e.stopPropagation()
  store.hideContextMenu()
  store.setCurComponent({ component: props.element, index: props.index })
  if (props.element.isLock) return

  const pos = { ...props.defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top)
  const startLeft = Number(pos.left)

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent) => {
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    pos.top = curY - startY + startTop
    pos.left = curX - startX + startLeft

    // 修改当前组件样式
    store.setShapeStyle(pos)
    // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
    // 如果不使用 $nextTick，吸附后将无法移动
    // nextTick(() => {
    //   // 触发元素移动事件，用于显示标线、吸附功能
    //   // 后面两个参数代表鼠标移动方向
    //   // curY - startY > 0 true 表示向下移动 false 表示向上移动
    //   // curX - startX > 0 true 表示向右移动 false 表示向左移动
    //   eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
    // })
  }
  const up = () => {
    hasMove && store.recordSnapshot()
    // 触发元素停止移动事件，用于隐藏标线
    // eventBus.$emit('unmove')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  if (e.button !== 0) return //仅鼠标左键点击可以移动
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>

<style lang="scss" scoped>
.shape {
  // position: absolute;
  position: relative;
  width: 100%;
  margin-bottom: 1px;

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
</style>
