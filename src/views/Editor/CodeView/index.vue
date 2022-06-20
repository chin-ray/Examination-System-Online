<template>
  <el-link type="primary" :icon="Document" :underline="false" class="template-view" @click="showCode">源码预览</el-link>

  <div class="custom-drawer">
    <el-drawer v-model="state.drawerVisible" title="源码预览" size="50%" direction="rtl" :before-close="handleClose">
      <code-editor v-if="state.drawerVisible" :mode="'html'" v-model="state.codeStore" />
    </el-drawer>
  </div>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import CodeEditor from '@/components/code-editor/index'
import { generateCode } from '@/utils/code-generator'

const state = reactive({
  drawerVisible: false,
  codeStore: '',
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
  state.drawerVisible = true
  state.codeStore = generateCode('formJson')
}
const handleClose = () => {
  state.drawerVisible = false
  state.codeStore = ''
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
.custom-drawer:deep(.el-drawer) {
  .el-drawer__header {
    margin-bottom: 0;
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>
