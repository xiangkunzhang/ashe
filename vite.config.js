import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    base:'/ashe/',
    plugins: [vue(), compression()],
    resolve: {
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    build: {
        minify: false
    }
})
