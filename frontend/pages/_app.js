import '../styles/globals.css'
import { AppProvider } from '../services/store'
import { I18nProvider } from '../utils/i18n'

export default function App({ Component, pageProps }) {
  return (
    <I18nProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </I18nProvider>
  )
}
