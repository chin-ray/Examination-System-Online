<template>
  <div class="component-list">
    <el-row :gutter="8">
      <el-col v-for="(item, index) in state.componentList" :key="`component-item-${index}`" :span="12">
        <el-card shadow="hover" :data-index="index" :draggable="true" @dragstart="handleDragStart">
          <el-icon><Box /></el-icon>
          <span class="ml-1">{{ item.label }}</span>
        </el-card>
      </el-col>
    </el-row>

    <draggable
      :list="state.componentList"
      item-key="id"
      v-bind="{
        sort: false, // 排序
        handle: `.drag-handler`, // 在列表项中拖动句柄选择器
        group: { name: 'article', pull: 'clone', put: false }, // name相同的组可以互相拖动 { name: '', pull: [true, false, clone], put: [true, false, array] }
        animation: 300,
        fallbackOnBody: true
      }"
      tag="ul"
      :move="checkMove"
      :clone="handleFieldWidgetClone"
    >
      <template #item="{ element }">
        <el-card class="drag-handler" shadow="hover" :data-index="index">
          <el-icon><Box /></el-icon>
          <span class="ml-1">{{ element.label }}</span>
        </el-card>
      </template>
    </draggable>
    <div class="editor-container" style="height: 100px; width: 100px; border: 1px solid #000">
      <draggable
        :list="state.componentData"
        item-key="id"
        v-bind="{
          disabled: true, // 是否禁用sortable
          handle: `.drag-handler`, // 在列表项中拖动句柄选择器
          ghostClass: 'ghost', // 拖动元素的class占位符类名
          group: { name: 'article', pull: '' }, // name相同的组可以互相拖动 { name: '', pull: [true, false, clone], put: [true, false, array] }
          animation: 300,
          fallbackOnBody: true
        }"
        tag="transition-group"
        :move="checkMove"
        @add="onDragAdd"
        @update="onDragUpdate"
        @start="onDragAdd"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <el-card class="drag-handler" shadow="hover" :data-index="index">
            <el-icon><Box /></el-icon>
            <span class="ml-1">{{ element.label }}</span>
          </el-card>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Box } from '@element-plus/icons-vue'
import componentList from './component-list'
import { mainStore } from '@/store'
const store = mainStore()

const state = reactive({
  componentList: componentList,
  componentData: []
})

const onDragEnd = (e) => {
  console.log('onDragEnd' + e)
}

const onDragAdd = (e) => {
  console.log('onDragAdd' + e)
}

const onDragUpdate = (e) => {
  console.log('onDragUpdate' + e)
}

const checkMove = (e) => {
  console.log('checkMove' + e)
}
const handleFieldWidgetClone = (e) => {
  console.log('handleFieldWidgetClone' + e)
}

const handleDragStart = (e) => {
  e.dataTransfer.setData('index', e.target.dataset.index)
  store.setIsDragInEdiotr(true)
  store.hideContextMenu()
}
</script>

<style lang="scss" scoped>
.component-list {
  padding: 0 10px;
  :deep(.el-col) {
    margin-top: 10px;
  }

  :deep(.el-card__body) {
    padding: 8px 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
