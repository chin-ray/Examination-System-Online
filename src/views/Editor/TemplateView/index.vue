<template>
  <el-button @click="showCode">源码</el-button>
  <el-dialog
    title="代码预览"
    v-model="state.codeDialogVisible"
    width="70%"
    top="10vh"
    :center="true"
    :before-close="handleClose"
  >
    <codemirror v-model:value="code" :border="true" :KeepCursorInEnd="true" :options="state.cmOption" />
  </el-dialog>
</template>

<script setup>
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
:deep(.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like) {
  padding-left: 2rem;
}
</style>
