<template>
  <div id="editor" class="editor" :class="{ edit: props.isEdit }">
    <!-- 网格线 -->
    <Grid />
    <div
      v-for="(item, index) in state.componentData"
      :key="item.id"
      :default-style="item.style"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        :is="item.component"
        v-if="item.component != 'v-text'"
        :id="'component' + item.id"
        class="component"
        :prop-value="item.propValue"
        :element="item"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, computed } from 'vue'
import Grid from './Grid'
import { mainStore } from '@/store'
const store = mainStore()

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: true
  }
})

const state = reactive({
  componentData: store.componentData,
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
