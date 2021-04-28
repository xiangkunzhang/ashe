<template>
    <img alt="Vue logo" src="./assets/logo.png"/>
    <el-button type="success">测试</el-button>
    <el-button type="success" @click="onBtnClick">測試</el-button>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view v-slot="{Component}">
        <Suspense>
            <component :is="Component"/>
        </Suspense>
    </router-view>
</template>

<script>
    // import {Router} from 'vue-router'
    // import  {$r} from 'vue'
    // import {RouterLink,useLink} from 'vue-router'

    export default {
        // props: {
            // ...RouterLink.props
        // },
        methods: {
            onBtnClick() {
                console.log(this)
                console.log(this.$router)
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>