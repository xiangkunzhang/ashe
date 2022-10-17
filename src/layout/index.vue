<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout-sider
      v-if="!isSmallPage"
      :show-trigger="false"
      @collapse="collapsed = true"
      position="absolute"
      @expand="collapsed = false"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :native-scrollbar="false"
      class="layout-sider"
    >
      <sys-logo :collapsed="collapsed" />
      <AsideMenu v-model:collapsed="collapsed" />
    </n-layout-sider>
    <n-drawer v-model:show="showSideDrawder" placement="left" width="320" class="layout-side-drawer">
      <sys-logo :collapsed="collapsed" />
    </n-drawer>
    <n-layout>
      <n-layout-header position="absolute">
        <page-header v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout-content class="layout-content" :class="{ 'layout-default-background': isDarkTheme === false }">
        <div class="layout-content-main layout-content-main-fix">
          <div class="main-view noMultiTabs main-view-fix mt-3">
            <MainView />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
  import { SysLogo, PageHeader, MainView, AsideMenu } from './components'
  import { computed, ref } from 'vue'
  import { useWindowSize } from '@vueuse/core'
  import { useAppSettingStore } from '@/store/modules/AppSetting'

  const { width } = useWindowSize()
  const settingStore = useAppSettingStore()
  const isSmallPage = computed<boolean>(() => {
    settingStore.setIsMobile(width.value < 1024)
    return settingStore.getIsMobile
  })
  const collapsed = ref<boolean>(false)
  const isDarkTheme = ref<boolean>(false)

  // 控制显示或隐藏移动端侧边栏
  const showSideDrawder = computed({
    get: () => isSmallPage.value && collapsed.value,
    set: val => (collapsed.value = val)
  })
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: row;
    flex: auto;

    &-default-background {
      background: #f5f7f9;
    }

    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }

    .layout-sider-fix {
      position: fixed;
      top: 0;
      left: 0;
    }

    .ant-layout {
      overflow: hidden;
    }

    .layout-right-fix {
      overflow-x: hidden;
      padding-left: 200px;
      min-height: 100vh;
      transition: all 0.2s ease-in-out;
    }

    .layout-content {
      flex: auto;
      min-height: 100vh;
    }

    .n-layout-header.n-layout-header--absolute-positioned {
      z-index: 11;
    }

    .n-layout-footer {
      background: none;
    }
  }

  .layout-content-main {
    margin: 0 10px 10px;
    position: relative;
    padding-top: 64px;
  }

  .layout-content-main-fix {
    padding-top: 64px;
  }

  .fluid-header {
    padding-top: 0;
  }

  .main-view-fix {
    padding-top: 44px;
  }

  .noMultiTabs {
    padding-top: 0;
  }
</style>

<style lang="scss">
  .layout-side-drawer {
    background-color: rgb(0, 20, 40);

    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }
  }
</style>
