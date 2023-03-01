<template>
  <n-input />
  <n-button @click="changeLocale('zh-cn')">中文</n-button>
  <n-button @click="changeLocale('en-us')">英文</n-button>
  <h1 class="text-6xl text-center">{{ $t('hello') }}</h1>
  <div v-for="i in 100" :key="i">Home{{ i }}</div>
</template>

<script setup lang="ts">
  import { useAppSettingStore } from '@/store/modules/AppSetting'

  const settingStore = useAppSettingStore()
  const changeLocale = locale => {
    settingStore.setLocale(locale)
  }
  console.log(new Date().getTime())
  console.log('123')
</script>

<style lang="scss" scoped></style>
