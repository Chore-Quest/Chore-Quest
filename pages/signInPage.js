import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../client'
import { motion } from 'framer-motion'

const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signIn({
      email,
      password,
    })

    if (error) {
      alert(JSON.stringify(error))
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-center text-xl text-white">
          Sign in to your account
        </h2>

        <div className="flex flex-col p-6">
          <form className="flex flex-col" onSubmit={handleSignIn}>
            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              className="rounded-md py-1 px-4 focus:outline-none focus:ring-2"
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
            >
              Sign in with Email
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
