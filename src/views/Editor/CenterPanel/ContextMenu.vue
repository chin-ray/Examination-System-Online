<template>
  <div v-show="menuShow" class="contextmenu" :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }">
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li @click="copy">复制</li>
          <li @click="paste">粘贴</li>
          <li @click="cut">剪切</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <li @click="upComponent">上移</li>
          <li @click="downComponent">下移</li>
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { mainStore } from '@/store'
const store = mainStore()

const state = reactive({
  copyData: null
})

const menuTop = computed(() => store.menuTop)
const menuLeft = computed(() => store.menuLeft)
const menuShow = computed(() => store.menuShow)
const curComponent = computed(() => store.curComponent)

// 点击菜单时不取消当前组件的选中状态
const handleMouseUp = () => {
  store.setClickComponentStatus(true)
}

// 锁定
const lock = () => {
  store.lock()
}

// 取消锁定
const unlock = () => {
  store.unlock()
}

// 剪切
const cut = () => {
  store.cut()
}

// 复制
const copy = () => {
  store.copy()
}

// 粘贴
const paste = () => {
  store.paste(true)
  store.recordSnapshot()
}

// 删除
const deleteComponent = () => {
  store.deleteComponent()
  store.recordSnapshot()
}

// 上移一层
const upComponent = () => {
  store.upComponent()
  store.recordSnapshot()
}

// 下移一层
const downComponent = () => {
  store.downComponent()
  store.recordSnapshot()
}

// 置顶
const topComponent = () => {
  store.topComponent()
  store.recordSnapshot()
}

// 置地
const bottomComponent = () => {
  store.bottomComponent()
  store.recordSnapshot()
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
