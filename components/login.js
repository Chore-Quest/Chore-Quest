import { useState } from 'react'
import { supabase } from '../client'
import SignIn from '../pages/signInPage'
import SignUp from '../pages/signUpPage'
export default function Login() {
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
    <div className="container mx-auto grid min-h-screen place-content-center">
      <SignIn />
      <SignUp />
      <p className="mb-4">Sign in via magic link with your email below</p>
      <input
        className="mb-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email)
        }}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Send magic link</span>
      </button>
    </div>
  )
}
