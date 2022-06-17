<template>
  <el-link type="primary" :icon="Document" :underline="false" class="template-view" @click="showCode">源码预览</el-link>

  <div class="custom-drawer">
    <el-drawer
      v-if="state.drawerVisible"
      v-model="state.drawerVisible"
      title="源码预览"
      size="40%"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-scrollbar height="calc(100vh - 50px - 10px)">
        <code-editor :mode="'html'" v-model="state.codeStore" />
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import CodeEditor from './code-editor.vue'

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
}
const handleClose = () => {
  state.drawerVisible = false
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
