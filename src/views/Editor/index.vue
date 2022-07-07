<template>
  <el-container class="main-container">
    <el-header class="header">
      <div class="header-panel rowCC">
        工具栏
        <CodeView />
      </div>
    </el-header>

    <el-container>
      <!-- 左侧组件列表 -->
      <el-aside class="aside-item left">
        <LeftPanel />
      </el-aside>
      <!-- 中间画布 -->
      <el-scrollbar class="container-scroll-bar" height="calc(100vh - 42px)" style="width: 100%" @scroll="onScroll">
        <el-main
          class="editor-main"
          :class="{ 'in-editor': isDragInEditor }"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <CenterPanel />
        </el-main>
      </el-scrollbar>
      <!-- 右侧组件列表 -->
      <el-aside class="aside-item right">
        <RightPanel v-if="curComponent" class="pl-2" />
        <el-empty v-else :image-size="120" description="未选中编辑元素" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup>
import { onBeforeMount, onMounted, computed } from 'vue'
import { listenGlobalKeyDown } from '@/utils/shortcutKey' //监听按键
import LeftPanel from './LeftPanel/index' // 左侧组件列表
import CenterPanel from './CenterPanel/index' // 中间画布
import RightPanel from './RightPanel/index' // 右侧画布
import CodeView from './CodeView/index' // 源码预览按钮
import componentList from './LeftPanel/component-list' // 左侧列表数据
import { mainStore } from '@/store'
import { generateID, deepCopy } from '@/utils/utils'
const store = mainStore()

const isDragInEditor = computed(() => store.isDragInEditor)
const curComponent = computed(() => store.curComponent)

// 拖拽结束
const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()

  const index = e.dataTransfer.getData('index')
  if (index && index != 'undefined') {
    const component = deepCopy(componentList[index])
    // component.style.top = e.layerY - component.style.height / 2
    // component.style.left = e.layerX - component.style.width / 2
    component.id = generateID()
    // store.addComponent({ component })
    store.updateComponent({ component })
    store.setCurComponent({ component, index: store.componentData.length - 1 })
    store.recordSnapshot()
  } else {
    store.updateComponent({ component: null })
  }
  store.setDragToComponent(null)
}
// 拖拽过程
const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
// 鼠标单击按下
const handleMouseDown = (e) => {
  e.stopPropagation()
  store.setClickComponentStatus(false)
  store.setInEditorStatus(true)
}
// 鼠标单击抬起
const handleMouseUp = (e) => {
  deselectCurComponent(e)
}
const deselectCurComponent = (e) => {
  if (!store.isClickComponent) {
    store.setCurComponent({ component: null, index: null })
  }
}

// 页面滚动
const onScroll = () => {
  store.hideContextMenu()
}

onBeforeMount(() => {
  listenGlobalKeyDown() // 全局监听按键事件
})
</script>

<style lang="scss">
$headerHeight: 42px;
$padding: 8px;
$leftWidth: 270px;
$rightWidth: 300px;

.main-container {
  height: 100vh;
  background-color: #f1f2f6;
  user-select: none;

  header {
    height: $headerHeight;
    padding: $padding;
    padding-bottom: 0;

    .header-panel {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 3px;
    }
  }

  .aside-item {
    height: calc(100% - #{$padding});
    padding-top: $padding;
    margin-top: $padding;
    background-color: #fff;

    &.left {
      width: $leftWidth;
    }
    &.right {
      width: $rightWidth;
    }
  }

  .container-scroll-bar {
    .el-scrollbar__view {
      min-height: calc(100vh - #{$headerHeight} - 16px);
    }
  }
  .editor-main {
    min-height: calc(100vh - #{$headerHeight} - 16px);
    background-color: #fff;
    padding: 0;
    margin: $padding;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}

.in-editor {
  outline: 2px solid #409eff;
}
</style>
