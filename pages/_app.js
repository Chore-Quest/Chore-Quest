import { Nav } from './nav'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import SvgComponent from './randomSvg'

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
    <div className="flex bg-black text-white ">
      <Nav user={user} />
      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
