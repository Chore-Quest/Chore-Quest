import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import Login from '../components/login'
import Profile from '../components/profile'

export default function Home() {
  // **** Need to add due date to database ****
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
