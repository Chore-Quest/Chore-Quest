import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../client'

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
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-white">
          Sign in to your account
        </h1>

        <div className="flex flex-col p-6">
          <form className="flex flex-col" onSubmit={handleSignIn}>
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

            <button
              className="mt-10 rounded-md bg-green-500 py-3 px-6 text-lg font-semibold text-white focus:outline-none focus:ring-2"
              type="submit"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
