<template>{{ curComponent }}</template>

<script setup>
import { computed } from 'vue'
import { mainStore } from '@/store'

const store = mainStore()

const curComponent = computed(() => store.curComponent)
</script>
