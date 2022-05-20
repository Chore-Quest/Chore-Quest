import React from 'react'
import { useState } from 'react'
import { supabase } from '../client'
import { motion } from 'framer-motion'

export function MagicLink() {
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  return (
    <div className="mx-auto grid place-content-center">
      <p className="mb-4">Sign in via magic link with your email below</p>
      <input
        className="mb-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <motion.button
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email)
        }}
        className="mt-4 w-full rounded-lg border-gray-300 bg-gray-500 p-2 pl-5 pr-5 text-lg text-gray-100 hover:bg-gray-900 focus:border-4"
      >
        <span>Send magic link</span>
      </motion.button>
    </div>
  )
}
