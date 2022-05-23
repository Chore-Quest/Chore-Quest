import '../styles/globals.css'
import AppProps from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Provider } from 'react-redux'
import store from '../store/store'
import Nav from '../components/nav'
import BottomMenu from '../components/bottomMenu'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AnimatePresence } from 'framer-motion'

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
  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
    <Provider store={store}>
      <Head>
        <title>Chore Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <Nav user={user} />
      <AnimatePresence exitBeforeEnter>
        <div
          id="app"
          className="bg-base container min-h-screen w-full py-8 px-8"
        >
          <Component {...pageProps} />
        </div>
      </AnimatePresence>
      <BottomMenu />
    </Provider>
  )
}
export default MyApp
