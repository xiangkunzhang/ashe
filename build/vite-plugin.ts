import type { Plugin, PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import compressPlugin from 'vite-plugin-compression'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'

/** 创建Vite插件集 */
export const makePlugin = (env: ViteEnv) => {
  const vitePlugins: (Plugin | PluginOption)[] = [
    vue(),
    vueJsx(),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()]
    }),
    configHtmlPlugin(env),
    configMockPlugin(env)
  ]
  if (!env.isDev) {
    vitePlugins.push(configCompressPlugin('gzip'))
  }
  return vitePlugins
}

/** 配置 文件压缩插件 */
function configCompressPlugin(compress: 'gzip' | 'brotli' | 'none'): Plugin | Plugin[] {
  const compressList = compress.split(',')
  const plugins: Plugin[] = []
  if (compressList.includes('gzip')) {
    plugins.push(compressPlugin({ ext: '.gz' }))
  }
  if (compressList.includes('brotli')) {
    plugins.push(compressPlugin({ ext: '.br', algorithm: 'brotliCompress' }))
  }
  return plugins
}

/** 配置Html加载插件 */
function configHtmlPlugin(env: ViteEnv): PluginOption[] {
  const { VITE_APP_TITLE } = env
  /* HTML 未加载JS前 loading*/
  const loadingHtml = `<style>
      .first-loading-wrap { display: flex; width: 100%; height: 96vh; justify-content: center; align-items: center; flex-direction: column; }
      .first-loading-wrap > h1 { font-size: 128px; }
      .first-loading-wrap .loading-wrap { padding: 98px; display: flex; justify-content: center; align-items: center; }
      .dot { animation: antRotate 1.2s infinite linear; transform: rotate(45deg); position: relative; display: inline-block; font-size: 32px; width: 32px; height: 32px; box-sizing: border-box; }
      .dot i { width: 14px; height: 14px; position: absolute; display: block; background-color: #1890ff; border-radius: 100%; transform: scale(.75); transform-origin: 50% 50%; opacity: .3; animation: antSpinMove 1s infinite linear alternate; }
      .dot i:nth-child(1) { top: 0; left: 0; }
      .dot i:nth-child(2) { top: 0; right: 0; -webkit-animation-delay: .4s; animation-delay: .4s; }
      .dot i:nth-child(3) { right: 0; bottom: 0; -webkit-animation-delay: .8s; animation-delay: .8s; }
      .dot i:nth-child(4) { bottom: 0; left: 0; -webkit-animation-delay: 1.2s; animation-delay: 1.2s; }
      @keyframes antRotate { to { -webkit-transform: rotate(405deg); transform: rotate(405deg); } }
      @-webkit-keyframes antRotate { to { -webkit-transform: rotate(405deg); transform: rotate(405deg); } }
      @keyframes antSpinMove { to { opacity: 1; } }
      @-webkit-keyframes antSpinMove { to { opacity: 1; } }
    </style>
    <div class="first-loading-wrap">
      <div class="loading-wrap">
        <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
      </div>
    </div>`

  return createHtmlPlugin({
    minify: !env.isDev,
    inject: {
      data: {
        title: VITE_APP_TITLE,
        loadingHtml: loadingHtml
      }
    }
  })
}

/** 配置Mock插件*/
function configMockPlugin(env: ViteEnv): Plugin {
  return viteMockServe({
    mockPath: 'mock',
    ignore: /^_/,
    localEnabled: env.VITE_MOCK && env.isDev,
    prodEnabled: env.VITE_MOCK,
    injectCode: env.VITE_MOCK
      ? `
      import { setupProdMockServer } from '../mock/_createProductionServer';
      setupProdMockServer();
      `
      : ''
  })
}
