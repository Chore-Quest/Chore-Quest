import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../client'
import { motion } from 'framer-motion'

const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(JSON.stringify(error))
    } else {
      router.push('/profile')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-white">
          Create new account
        </h1>

        <form className="mt-1 flex flex-col p-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-gray-200">
            Email
          </label>
          <input
            className="rounded-md py-2 px-4 focus:outline-none focus:ring-2"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="mt-6 text-gray-200">
            Password
          </label>
          <input
            className="rounded-md py-2 px-4 focus:outline-none focus:ring-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className="mt-10 rounded-md bg-gray-500 py-3 px-6 text-lg font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-2"
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
