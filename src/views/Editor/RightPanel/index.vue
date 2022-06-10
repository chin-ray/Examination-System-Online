<template>
  <el-tabs v-model="state.activeName" @tab-click="handleClick">
    <el-tab-pane label="属性" name="attr">
      <AttrList />
    </el-tab-pane>
    <el-tab-pane label="动画" name="animation">
      <AnimationList />
    </el-tab-pane>
    <el-tab-pane label="事件" name="events">
      <EventList />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { reactive } from 'vue'
import AttrList from './AttrList.vue'
import AnimationList from './AnimationList.vue'
import EventList from './EventList.vue'

const state = reactive({
  activeName: 'attr'
})

const handleClick = (tab, event) => {
  //   console.log(tab, event)
}
</script>

<style></style>
