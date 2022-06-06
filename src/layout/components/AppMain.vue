<template>
  <div class="app-main">
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <!--has transition  Judging by settings.mainNeedAnimation-->
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="key" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
