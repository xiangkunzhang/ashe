<template>
  <div class="layout-header">
    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div class="ml-1 layout-header-trigger layout-header-trigger-min" @click="handleCollapsed">
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div class="mr-1 layout-header-trigger layout-header-trigger-min" @click="reloadPage">
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb>
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown v-if="routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
              <span class="link-text">
                <!-- <component v-if="routeItem.meta.icon" :is="routeItem.meta.icon" />-->
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <!-- <component v-if="routeItem.meta.icon" :is="routeItem.meta.icon" />-->
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <!--右侧菜单-->
    <div class="layout-header-right">
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18" @click="toggle">
              <FullscreenExitOutlined v-if="isFullscreen" />
              <FullscreenOutlined v-else />
            </n-icon>
          </template>
          <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MenuFoldOutlined, MenuUnfoldOutlined, FullscreenOutlined, FullscreenExitOutlined, ReloadOutlined, UserOutlined } from '@vicons/antd'
  import { useRoute, useRouter } from 'vue-router'
  import { computed, unref } from 'vue'
  import { useFullscreen } from '@vueuse/core'
  import { useDialog, useMessage } from 'naive-ui'

  const { isFullscreen, toggle } = useFullscreen()

  const props = defineProps<Prop>()
  const emit = defineEmits<Emit>()
  const router = useRouter()
  const route = useRoute()
  const dialog = useDialog()
  const message = useMessage()

  const username = '测试'

  const handleCollapsed = () => emit('update:collapsed', !props.collapsed)

  // 刷新页面
  const reloadPage = () => router.push({ path: '/redirect' + unref(route).fullPath })

  const generator: any = routerMap => {
    return routerMap.map(item => {
      const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/'
      }
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        // Recursion
        currentMenu.children = generator(item.children, currentMenu)
      }
      return currentMenu
    })
  }

  const breadcrumbList = computed(() => generator(route.matched))

  const dropdownSelect = key => router.push({ name: key })

  // 退出登录
  const doLogout = () => {
    dialog.info({
      title: '提示',
      content: '您确定要退出登录吗',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        message.success('成功退出登录')
        router
          .replace({
            name: 'AuthLogin',
            query: {
              redirect: route.fullPath
            }
          })
          .finally(() => location.reload())
      }
    })
  }

  const avatarOptions = [
    {
      label: '个人设置',
      key: 1
    },
    {
      label: '退出登录',
      key: 2
    }
  ]

  //头像下拉菜单
  const avatarSelect = key => {
    switch (key) {
      case 1:
        router.push({ name: 'Setting' })
        break
      case 2:
        doLogout()
        break
    }
  }

  interface Prop {
    collapsed: boolean
    inverted?: boolean
  }

  interface Emit {
    (e: 'update:collapsed', v: boolean): void
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/var.scss';

  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: $header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: #515a6e;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }
</style>
