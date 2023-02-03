<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout>
      <n-layout-content class="layout-content" :class="{ 'layout-default-background': isDarkTheme === false }">
        <div class="layout-content-main">
          <div class="main-view">
            <MainView />
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
  import { MainView } from './components'
  import { ref } from 'vue'

  const isDarkTheme = ref<boolean>(false)
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: row;
    flex: auto;

    &-default-background {
      background: #f5f7f9;
    }

    .layout-content {
      flex: auto;
      min-height: 100vh;
    }
  }

  .layout-content-main {
    position: relative;
  }
</style>
