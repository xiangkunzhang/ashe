<template>
  <n-config-provider :locale="localeMessage.NaiveUILocale" :date-locale="localeMessage.NaiveDateLocale" preflight-style-disabled :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <naive-provider-content />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { computed, defineComponent, h } from 'vue'
  import { useAppSettingStore } from '@/store/modules/AppSetting'
  import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui'
  import type { GlobalThemeOverrides } from 'naive-ui'
  const settingStore = useAppSettingStore()

  const localeMessage = computed(() => settingStore.getLocaleMessage)

  // 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
  function registerNaiveTools() {
    window.$loadingBar = useLoadingBar()
    window.$dialog = useDialog()
    window.$message = useMessage()
    window.$notification = useNotification()
  }

  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#1976d2',
      primaryColorHover: '#4098FC',
      primaryColorPressed: '#0860B8',
      primaryColorSuppl: '#4098FC'
    }
  }

  const NaiveProviderContent = defineComponent({
    setup() {
      registerNaiveTools()
    },
    render() {
      return h('div')
    }
  })
</script>
