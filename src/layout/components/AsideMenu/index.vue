<template>
  <div>
    <router-link to="/">首页</router-link>
    <router-link :to="{ name: 'ABOUT' }">关于</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
  export default { name: 'Index' }
</script>

<style lang="scss" scoped></style>
