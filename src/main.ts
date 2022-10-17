import './styles/tailwind.css'
import './styles/index.scss'
import App from './app/index'

console.group('Naive 项目模板')
console.table(import.meta.env)
console.groupEnd()
App.mount('#app')
