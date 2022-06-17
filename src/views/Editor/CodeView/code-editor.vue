<template>
  <div class="px-1">
    <!-- 官方文档中使用id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
    <div ref="aceRef"></div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watchEffect } from 'vue'
import ace from 'ace-builds'
/* 启用此行后webpack打包会生成很多动态加载的js文件，不便于部署，故禁用！！
     特别提示：禁用此行后，需要调用ace.config.set('basePath', 'path...')指定动态js加载URL！！
   */
//import 'ace-builds/webpack-resolver'

//import 'ace-builds/src-min-noconflict/theme-monokai' // 默认设置的主题
import 'ace-builds/src-min-noconflict/theme-sqlserver' // 新设主题
import 'ace-builds/src-min-noconflict/mode-javascript' // 默认设置的语言模式
import 'ace-builds/src-min-noconflict/mode-json' //
import 'ace-builds/src-min-noconflict/mode-css' //
import 'ace-builds/src-min-noconflict/ext-language_tools'
import { ACE_BASE_PATH } from '@/utils/config'

const aceRef = ref(null)

const props = defineProps({
  modelValue: {
    type: String
    //required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'html'
  },
  userWorker: {
    //是否开启语法检查，默认关闭
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])

const state = reactive({
  aceEditor: null,
  themePath: 'ace/theme/sqlserver', // 不导入 webpack-resolver，该模块路径会报错
  modePath: 'ace/mode/javascript', // 同上
  codeValue: ''
})

const addAutoCompletion = (ace) => {
  let acData = [
    { meta: 'VForm API', caption: 'getWidgetRef', value: 'getWidgetRef()', score: 1 },
    { meta: 'VForm API', caption: 'getFormRef', value: 'getFormRef()', score: 1 }
    //TODO: 待补充！！
  ]
  let langTools = ace.require('ace/ext/language_tools')
  langTools.addCompleter({
    getCompletions: function (editor, session, pos, prefix, callback) {
      if (prefix.length === 0) {
        return callback(null, [])
      } else {
        return callback(null, acData)
      }
    }
  })
}

const setJsonMode = () => {
  state.aceEditor.getSession().setMode('ace/mode/json')
}

const setCssMode = () => {
  state.aceEditor.getSession().setMode('ace/mode/css')
}

onMounted(() => {
  //ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace')
  ace.config.set('basePath', ACE_BASE_PATH)

  addAutoCompletion(ace) //添加自定义代码提示！！

  state.aceEditor = ace.edit(aceRef.value, {
    maxLines: 36, // 最大行数，超过会自动出现滚动条
    minLines: 36, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
    fontSize: 14, // 编辑器内字体大小
    theme: state.themePath, // 默认设置的主题
    mode: state.modePath, // 默认设置的语言模式
    tabSize: 2, // 制表符设置为2个空格大小
    readOnly: props.readonly,
    highlightActiveLine: true,
    value: state.codeValue
  })

  state.aceEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true, // 设置代码片段提示
    enableLiveAutocompletion: true // 设置自动提示
  })

  if (props.mode === 'json') {
    setJsonMode()
  } else if (props.mode === 'css') {
    setCssMode()
  }

  if (!props.userWorker) {
    state.aceEditor.getSession().setUseWorker(false)
  }

  //编辑时同步数据
  state.aceEditor.getSession().on('change', (ev) => {
    emits('update:modelValue', state.aceEditor.getValue())
  })
})

watchEffect(() => {
  state.codeValue = props.modelValue
})
</script>

<style lang="scss" scoped></style>
