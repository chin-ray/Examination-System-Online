<template>
  <div
    v-show="menuShow"
    ref="contextmenu"
    class="contextmenu"
    :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }"
    @mousedown="EventAction"
    @contextmenu="EventAction"
  >
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li @click="copy">
            <el-icon><DocumentCopy /></el-icon>
            复制
          </li>
          <li @click="cut">
            <el-icon><Scissor /></el-icon>
            剪切
          </li>
          <li @click="deleteComponent">
            <el-icon><Delete /></el-icon>
            删除
          </li>
          <li @click="lock">
            <el-icon><Lock /></el-icon>
            锁定
          </li>
        </template>
        <li v-else @click="unlock">
          <el-icon><Unlock /></el-icon>
          解锁
        </li>
      </template>
      <li v-else-if="copyData" @click="paste">
        <el-icon><Document /></el-icon>
        粘贴
      </li>
      <li @click="">
        <el-icon><RefreshLeft /></el-icon>
        撤销
      </li>
      <li @click="">
        <el-icon><RefreshRight /></el-icon>
        重做
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  DocumentCopy,
  Scissor,
  Document,
  Delete,
  Lock,
  Unlock,
  RefreshLeft,
  RefreshRight
} from '@element-plus/icons-vue'
import { mainStore } from '@/store'

const store = mainStore()

const contextmenu = ref(null)

const copyData = computed(() => store.copyData)
const menuTop = computed(() => {
  let top = store.menuTop
  const editorHeight = store.getEditor().height
  let menuPadding = 10
  let menuItemHeight = 30
  let menuCount = 2
  if (store.curComponent && !store.isLock) menuCount += 4
  if (store.curComponent && store.isLock) menuCount += 1
  if (!store.curComponent && store.copyData) menuCount += 1
  let menuHeight = menuPadding + menuItemHeight * menuCount
  if (menuHeight + top > editorHeight) top -= menuHeight
  return top
})
const menuLeft = computed(() => {
  let left = store.menuLeft
  const editorWidth = store.getEditor().width
  if (left + 74 > editorWidth) left -= 74
  return left
})
const menuShow = computed(() => store.menuShow)
const curComponent = computed(() => store.curComponent)

// 取消事件冒泡
const EventAction = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

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

// 复制
const copy = () => {
  store.copy()
}

// 剪切
const cut = () => {
  store.cut()
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
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    // border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    font-size: 12px;
    line-height: 16px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 0;
    padding: 5px 0;

    li {
      padding: 7px 16px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      box-sizing: border-box;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin-right: 6px;
      }

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
