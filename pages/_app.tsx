import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ResponseProvider } from './context/Global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ResponseProvider>
      <Component {...pageProps} />
    </ResponseProvider>
  )
}
