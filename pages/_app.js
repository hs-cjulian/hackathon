import '@/styles/globals.css'
import { Fira_Sans } from 'next/font/google'

const firaSans = Fira_Sans({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function App({ Component, pageProps }) {
  return(
    <main className={firaSans.className}>
      <Component {...pageProps} />
    </main>
  )
}
