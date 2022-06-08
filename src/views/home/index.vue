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
          @mouseup="handleMouseUp"
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
import { onBeforeMount } from 'vue'
import { listenGlobalKeyDown } from '@/utils/shortcutKey' //监听按键
import ComponentList from './modules/ComponentList' // 左侧组件列表
import Editor from './modules/Editor/index' // 中间画布
import { mainStore } from '@/store'
const store = mainStore()

// 拖拽结束
const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  console.log('handleDrop')
  const index = e.dataTransfer.getData('index')
  console.log(index)
}
// 拖拽过程
const handleDragOver = (e) => {
  // console.log('handleDragOver')
}
// 鼠标单击按下
const handleMouseDown = (e) => {
  // console.log('handleMouseDown')
}
// 鼠标单击抬起
const handleMouseUp = (e) => {
  // console.log('handleMouseUp')
  deselectCurComponent()
}
const deselectCurComponent = (e) => {
  // console.log('deselectCurComponent')
}

onBeforeMount(() => {
  listenGlobalKeyDown() // 全局监听按键事件
})
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
