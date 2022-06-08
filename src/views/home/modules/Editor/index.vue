<template>
  <div id="editor" class="editor" :class="{ edit: props.isEdit }"></div>
</template>

<script setup>
import { defineProps, reactive, computed } from 'vue'
import { changeStyleWithScale } from '@/utils/translate'
import { mainStore } from '@/store'
const store = mainStore()

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: true
  }
})

const state = reactive({
  editorX: 0,
  editorY: 0,
  start: {
    // 选中区域的起点
    x: 0,
    y: 0
  },
  width: 0,
  height: 0,
  isShowArea: false
})

console.log(store)
const canvasStyleData = computed(() => store.canvasStyleData)
</script>

<style lang="scss" scoped>
$headerHeight: 50px;
$padding: 10px;

.editor {
  height: 100%;
  width: 100%;
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
