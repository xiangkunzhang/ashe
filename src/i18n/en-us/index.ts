import { enUS, dateEnUS } from 'naive-ui'
import Message from './message.json'

export default {
  name: 'en-us',
  message: {
    NaiveUILocale: enUS,
    NaiveDateLocale: dateEnUS,
    ...Message
  }
} as EkkoI18nLocal
