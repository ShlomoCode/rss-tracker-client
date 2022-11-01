// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// Translations provided by Vuetify
import { he, en } from 'vuetify/locale'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#3678f4',
    'primary-darken-1': '#3700B3',
    secondary: '#4994EC',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}


export default createVuetify({
  locale: {
    locale: 'he',
    fallback: 'en',
    messages: { he, en }
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
})