<template>
  {{ curComponent }}
</template>

<script setup>
import { computed, reactive } from 'vue'
import { mainStore } from '@/store'

const store = mainStore()

const curComponent = computed(() => store.curComponent)

const state = reactive({
  componentInfo: {
    style: {}
  }
})
</script>
