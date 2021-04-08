import App from './App.vue'
import {createSSRApp} from 'vue'
import './assets/index.sass'
import ElementPlus from 'element-plus'
import {createRouter} from "./router";

export function createApp() {
    const router = createRouter()
    const app = createSSRApp(App).use(ElementPlus).use(router)
    return {router, app}
}
