import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import Login from './Login'
import Profile from './Profile'

export default function AllChores() {
  // **** Need to add due date to database ****

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
