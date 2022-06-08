<template>
  <div class="home">
    <header>
      <div>6312</div>
    </header>
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
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
    </main>
  </div>
</template>

<script setup>
import ComponentList from './modules/ComponentList' // 左侧列表数据
import Editor from './modules/Editor/index' // 中间画布

const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  const index = e.dataTransfer.getData('index')
  const rectInfo = this.editor.getBoundingClientRect()
  if (index) {
    const component = deepCopy(componentList[index])
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    component.id = generateID()
    // this.$store.commit('addComponent', { component })
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
  if (!this.isClickComponent) {
    // this.$store.commit('setCurComponent', { component: null, index: null })
  }

  // 0 左击 1 滚轮 2 右击
  if (e.button != 2) {
    // this.$store.commit('hideContextMenu')
  }
}
</script>

<style lang="scss">
$headerHeight: 50px;
$padding: 10px;

.home {
  height: 100vh;
  background: #f1f2f6;

  header {
    height: $headerHeight;
    padding: $padding;
  }

  main {
    height: calc(100% - #{$headerHeight});
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
      background-color: #eff2f7;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
