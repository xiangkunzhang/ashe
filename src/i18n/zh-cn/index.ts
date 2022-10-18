import { zhCN, dateZhCN } from 'naive-ui'
import Message from './message.json'
export default {
  name: 'zh-cn',
  message: {
    NaiveUILocale: zhCN,
    NaiveDateLocale: dateZhCN,
    ...Message
  }
} as EkkoI18nLocal
