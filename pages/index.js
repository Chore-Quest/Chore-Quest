import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import Login from '../components/login'
import Profile from './profile'
import Modal from '../components/modal'
import { motion } from 'framer-motion'

export default function Home() {
  // **** Need to add due date to database ****
  // const [session, setSession] = useState(null)
  let session = supabase.auth.session()
  const router = useRouter()
  const [showModal, setShowModal] = useState(true)
  const close = () => setShowModal(false)
  const open = () => setShowModal(true)

  if (session) {
    {
      router.push('/profile')
      return null
    }
  } else {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </motion.div>
    )
  }
}
