// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// Translations provided by Vuetify
import { he, en } from 'vuetify/locale'


export default createVuetify({
  locale: {
    locale: 'he',
    fallback: 'en',
    messages: { he, en }
  }
})