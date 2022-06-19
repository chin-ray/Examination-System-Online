export const generateCode = function (templateStr = '', jsStr = '', scopedCss = '', globalCss = '') {
  return `<template>
${templateStr}
</template>

<script setup>
${jsStr}
</script>

<style lang="scss" scoped>
${scopedCss}
</style>

<style lang="scss">
${globalCss}
</style>`
}
