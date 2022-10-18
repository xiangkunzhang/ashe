interface EkkoI18nMessage {
  NaiveUILocale: any
  NaiveDateLocale: any
  [key: string]: any
}

interface EkkoI18nLocal {
  name: string
  message: EkkoI18nMessage
}
