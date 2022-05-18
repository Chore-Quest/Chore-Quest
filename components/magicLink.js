import React from 'react'
export function MagicLink({ email, e, setEmail, handleLogin }) {
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
