<template>
  <div class="home">
    <header>
      <section class="header rowCC">工具栏</section>
    </header>
    <main>
      <!-- 左侧组件列表 -->
      <section class="item left">
        <component-list />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <!-- 右侧组件列表 -->
      <section class="item right rowCC">配置区</section>
    </main>
  </div>
</template>

<script setup>
import ComponentList from './modules/ComponentList' // 左侧组件列表
import componentListData from './modules/component-list' // 左侧组件列表数据
import Editor from './modules/Editor/index' // 中间画布
import { mainStore } from '@/store'
const store = mainStore()

const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  const index = e.dataTransfer.getData('index')
  const rectInfo = store.editor.getBoundingClientRect()
  if (index) {
    const component = deepCopy(componentListData[index])
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    component.id = generateID()
    store.addComponent(component)
    // this.$store.commit('recordSnapshot')
  }
}
const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const handleMouseDown = (e) => {
  e.stopPropagation()
  // this.$store.commit('setClickComponentStatus', false)
  // this.$store.commit('setInEditorStatus', true)
}

const deselectCurComponent = (e) => {
  // if (!this.isClickComponent) {
  //   // this.$store.commit('setCurComponent', { component: null, index: null })
  // }
  // 0 左击 1 滚轮 2 右击
  // if (e.button != 2) {
  //   // this.$store.commit('hideContextMenu')
  // }
}
</script>

<style lang="scss">
$headerHeight: 50px;
$padding: 8px;
$leftWidth: 220px;
$rightWidth: 250px;

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
      margin-left: calc(#{$leftWidth} + 40px);
      margin-right: calc(#{$rightWidth} + 40px);
      padding-bottom: $padding;

      .content {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
