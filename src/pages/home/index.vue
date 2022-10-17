<template>
  <div v-for="i in 100" :key="i">Home{{ i }}</div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
  export default { name: 'Index' }
</script>

<style lang="scss" scoped></style>
