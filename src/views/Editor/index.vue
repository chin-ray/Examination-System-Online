<template>
  <div class="home">
    <header>
      <section class="header rowCC">工具栏</section>
      <CodeView />
    </header>

    <main>
      <!-- 左侧组件列表 -->
      <section class="item left">
        <LeftPanel />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <CenterPanel />
        </div>
      </section>
      <!-- 悬浮工具栏 -->
      <!-- <div class="toolbar">
        <el-space direction="vertical">
          <el-button link :icon="Document" />
        </el-space>
      </div> -->
      <!-- 右侧组件列表 -->
      <section class="item right pl-2">
        <RightPanel v-if="curComponent" />
        <el-empty v-else :image-size="120" description="未选中编辑元素" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, computed } from 'vue'
import { Document } from '@element-plus/icons-vue'
import { listenGlobalKeyDown } from '@/utils/shortcutKey' //监听按键
import LeftPanel from './LeftPanel/index' // 左侧组件列表
import CenterPanel from './CenterPanel/index' // 中间画布
import RightPanel from './RightPanel/index' // 右侧画布
import CodeView from './CodeView/index' // 源码预览按钮
import componentList from './LeftPanel/component-list' // 左侧列表数据
import { mainStore } from '@/store'
import { generateID, deepCopy } from '@/utils/utils'
const store = mainStore()

const curComponent = computed(() => store.curComponent)

// 拖拽结束
const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  const index = e.dataTransfer.getData('index')
  if (index) {
    const component = deepCopy(componentList[index])
    component.style.top = e.layerY - component.style.height / 2
    component.style.left = e.layerX - component.style.width / 2
    component.id = generateID()
    store.addComponent({ component })
    store.setCurComponent({ component, index: store.componentData.length - 1 })
    store.recordSnapshot()
  }
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

onBeforeMount(() => {
  listenGlobalKeyDown() // 全局监听按键事件
})
onMounted(() => {
  store.getEditor() // 获取编辑器元素
})
</script>

<style lang="scss">
$headerHeight: 50px;
$padding: 8px;
$leftWidth: 270px;
$rightWidth: 300px;

.home {
  height: 100vh;
  background-color: #f1f2f6;
  user-select: none;

  header {
    height: $headerHeight;
    padding: $padding;

    .header {
      height: 100%;
      background-color: #fff;
      border-radius: 3px;
    }
  }

  main {
    height: calc(100% - #{$headerHeight});
    position: relative;

    .item {
      position: absolute;
      height: 100%;
      top: 0;
      padding-top: $padding;
      background-color: #fff;
    }
    .left {
      width: $leftWidth;
      left: 0;
    }
    .right {
      width: $rightWidth;
      right: 0;
    }

    .center {
      height: 100%;
      margin-left: calc(#{$leftWidth} + 10px);
      margin-right: calc(#{$rightWidth} + 10px);
      padding-bottom: $padding;

      .content {
        width: 100%;
        height: 100%;
      }
    }

    .toolbar {
      position: absolute;
      right: $rightWidth;
      top: 0;
      width: 40px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
