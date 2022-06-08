<template>
  <div
    id="editor"
    class="editor"
    :class="{ edit: props.isEdit }"
    :style="{
      width: changeStyleWithScale(canvasStyleData.width) + 'px',
      height: changeStyleWithScale(canvasStyleData.height) + 'px'
    }"
  ></div>
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
