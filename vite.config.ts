import type { UserConfig, ConfigEnv } from 'vite'
import path from 'path'
import { loadViteEnv, makePlugin } from './build/vite.setting'

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadViteEnv(mode, command)
  return {
    base: env.VITE_BASE_URL,
    resolve: { alias: { '~': path.resolve(process.cwd()), '@': `${path.resolve(process.cwd())}/src` } },
    plugins: makePlugin(env),
    server: { host: true, port: env.VITE_DEV_PORT },
    preview: { host: true, port: 3133 },
    css: { preprocessorOptions: { scss: { modifyVars: {}, javascriptEnabled: true, additionalData: `@import "src/styles/var.scss";` } } },
    build: {
      target: 'es2015',
      minify: 'esbuild',
      chunkSizeWarningLimit: 2000,
      cssTarget: 'chrome80',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
}
