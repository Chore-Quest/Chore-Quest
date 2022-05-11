import '../styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
// import SvgComponent from './randomSvg'
import { Provider } from 'react-redux'
import store from '../store/store'
import Nav from './components/nav'
import BottomMenu from './components/bottomMenu'

function MyApp({ Component, pageProps } = AppProps) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    )
    checkUser()
    return () => {
      authListener?.unsubscribe()
    }
  }, [])
  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  return (
    <Provider store={store}>
      <Head>
        <title>Chore Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-base container w-full">
        <Nav user={user} />
        <div className="py-8 px-16">
          <Component {...pageProps} />
        </div>
        <BottomMenu />
      </div>
    </Provider>
  )
}
export default MyApp
