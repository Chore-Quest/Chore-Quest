import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import Login from '../components/login'
import Profile from './profile'
import Modal from '../components/modal'
import { motion } from 'framer-motion'

export default function Home() {
  // **** Need to add due date to database ****
  const [session, setSession] = useState(null)
  const [showModal, setShowModal] = useState(true)
  const close = () => setShowModal(false)
  const open = () => setShowModal(true)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <main className="mx-auto h-screen">
      {!session ? (
        <div>
          {' '}
          {/* <motion.button
            className="frosted"
            onClick={showModal ? close : open}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started!
          </motion.button> */}
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
      ) : (
        <Profile session={session} />
      )}
    </main>
  )
}
