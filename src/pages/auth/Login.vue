<template>
  <div class="login-bg bg-no-repeat bg-center bg-cover">
    <section id="login" class="flex flex-col justify-center min-h-screen max-w-md mx-auto">
      <div class="bg-gray-50 bg-opacity-60 backdrop-blur-none px-10 py-6 rounded-2xl">
        <div class="flex items-center justify-center font-black m-3 mb-8">
          <h1 class="tracking-wide text-4xl text-gray-500">系统登录</h1>
        </div>
        <n-spin :show="loading">
          <n-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules">
            <n-form-item label="用户名" path="username">
              <n-input v-model:value="loginFormData.username" />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input v-model:value="loginFormData.password" type="password" />
            </n-form-item>
            <n-form-item>
              <n-button type="info" block @click="handleLoginClick">登录 </n-button>
            </n-form-item>
          </n-form>
        </n-spin>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInst, FormRules } from 'naive-ui'
  import { useFetchLogin } from '@/api/auth/auth'
  import { useAuthStore } from '@/store/modules/Auth'

  const loginFormRef = ref<FormInst | null>()
  const loginFormData = reactive({
    username: '',
    password: ''
  })
  const loginFormRules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: ['input', 'blur'] }],
    password: [{ required: true, message: '请输入密码' }]
  }
  const { result, loading, isError, doFetch } = useFetchLogin()
  const authStore = useAuthStore()

  const handleLoginClick = async () => {
    try {
      await loginFormRef.value?.validate()
      await doFetch(loginFormData)
      if (!isError.value) {
        authStore.setLoginUser(result.value)
      }
    } catch (e) {
      console.error(e)
    }
  }
</script>

<style lang="scss" scoped>
  .login-bg {
    background-image: url('/bg.png');
  }
</style>
