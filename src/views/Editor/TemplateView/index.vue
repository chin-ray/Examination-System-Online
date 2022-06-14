<template>
  <el-link type="primary" :icon="Document" :underline="false" class="template-view" @click="showCode">源码预览</el-link>
  <el-drawer v-model="state.codeDialogVisible" title="源码预览" size="40%" direction="rtl" :before-close="handleClose">
    <codemirror v-model:value="code" :options="state.cmOption" />
  </el-drawer>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue'
import Codemirror from 'codemirror-editor-vue3'
import { computed, reactive } from 'vue'

const code = computed({
  get() {
    return state.codeStore
  },
  set(newVal) {
    state.codeStore = newVal
  }
})

const state = reactive({
  codeDialogVisible: false,
  codeStore: `var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`,
  cmOption: {
    mode: 'text/x-vue', // 语言模式
    theme: 'default', // 主题
    lineNumbers: true, // 显示行号
    smartIndent: true, // 智能缩进
    indentUnit: 2, // 智能缩进空格长度
    foldGutter: true, // 启用行槽中的代码折叠
    styleActiveLine: true, // 显示选中行的样式
    tabSize: 2,
    line: true
  }
})
const showCode = () => {
  state.codeDialogVisible = true
}
const handleClose = () => {
  state.codeDialogVisible = false
}
</script>

<style scoped lang="scss">
.template-view {
  position: absolute;
  right: 20px;
  top: 20px;
}
:deep(.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like) {
  padding-left: 2rem;
}
</style>
