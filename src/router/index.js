import {createMemoryHistory, createRouter as _createRouter, createWebHistory} from 'vue-router'

/**
 * 创建路由组件
 * @returns {Router}
 */
export function createRouter() {
    let routes = makeDynamicRoutes()
    routes.push(...makeConstRouters())
    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory('/ashe/') : createWebHistory('/ashe/'),
        routes
    })
}

/**
 * 创建动态路由
 * @returns {Object}
 */
function makeDynamicRoutes() {
    const pages = import.meta.glob('../pages/**/*.vue')
    return Object.keys(pages).map(path => {
        const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()
        return {
            path: name === '/home' ? '/' : name,
            component: pages[path]
        }
    })
}

/**
 * 常量路由
 * @returns {({path: string, component: (function(): *), name: string}|{redirect: string, path: string, name: string})[]}
 */
function makeConstRouters() {
    return [
        {path: '/404', name: 'Error404', component: () => import('@/pages/error/404.vue')},
        {
            path: '/:pathMatch(.*)*', redirect: '/404', name: "NotFound"
        }
    ]
}