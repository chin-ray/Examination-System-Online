<template>
  <el-scrollbar height="calc(100vh - 50px - 40px - 8px - 15px)">
    <el-form>
      <el-form-item v-for="({ key, label }, index) in styleKeys" :key="index" :label="label">
        <el-color-picker v-if="key == 'borderColor'" v-model="curComponent.style[key]" />
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { mainStore } from '@/store'
import { styleData } from '@/utils/style'

const store = mainStore()

const styleKeys = computed(() => {
  const curComponentStyleKeys = Object.keys(store.curComponent.style)
  return styleData.filter((item) => curComponentStyleKeys.includes(item.key))
})
const curComponent = computed(() => store.curComponent)

const state = reactive({
  componentInfo: {
    style: {}
  }
})
</script>
