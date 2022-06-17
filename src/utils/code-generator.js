export const generateCode = function (formJson) {
  let formJsonStr = JSON.stringify(formJson)

  return `<template>
  <u-button>按钮</u-button>
</template>

<script setup>
</script>`
}
