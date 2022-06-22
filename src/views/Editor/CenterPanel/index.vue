<template>
  <div
    id="editor"
    class="editor"
    :class="{ 'in-editor': isDragInEdiotr }"
    @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown"
  >
    <Shape
      v-for="(item, index) in componentData"
      :key="item.id"
      :style="getShapeStyle(item.style)"
      :active="item.id === (curComponent || {}).id"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        :is="item.component"
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyle(item.style)"
        :prop-value="item.propValue"
        :element="item"
      />
    </Shape>
    <!-- 右键菜单 -->
    <ContextMenu v-if="store.editor" />
    <el-empty v-if="!componentData.length" :image-size="120" description="拖动到这" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import ContextMenu from './ContextMenu'
import Shape from './Shape'
import { getStyle } from '@/utils/style'
import { mainStore } from '@/store'
const store = mainStore()

const isDragInEdiotr = computed(() => store.isDragInEdiotr)
const componentData = computed(() => store.componentData)
const curComponent = computed(() => store.curComponent)

// 点击空白画板
const handleMouseDown = (e) => {
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!store.curComponent) {
    e.preventDefault()
  }
  store.hideContextMenu()
}

// 单击鼠标右键
const handleContextMenu = (e) => {
  e.stopPropagation()
  e.preventDefault()

  // 计算菜单相对于编辑器的位移
  let top = e.clientY - 42
  let left = e.clientX - 270

  store.showContextMenu({ top, left })
}

// 外层包裹组件样式
const getShapeStyle = (style) => {
  const result = {}
  ;['height'].forEach((attr) => {
    result[attr] = style[attr] + 'px'
  })
  return result
}

// 组件样式
const getComponentStyle = (style) => {
  return getStyle(style, ['top', 'left', 'width', 'height'])
}

onMounted(() => {
  store.setEditor() // 获取编辑器元素写入store
})
</script>

<style lang="scss" scoped>
$headerHeight: 42px;

.editor {
  min-height: calc(100vh - #{$headerHeight} - 16px);
  width: 100%;
  padding: 5px;
  background: #fff;

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
  .component {
    width: 100%;
    height: 100%;
  }
}

.in-editor {
  outline: 2px solid #409eff;
}
</style>
