import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import Login from './Login'
import Profile from './Profile'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <main className="mx-auto">
      {!session ? <Login /> : <Profile session={session} />}
    </main>
  )
}
