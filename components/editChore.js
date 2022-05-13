import { supabase } from '../client'
import { useState } from 'react'

export default function EditChore() {
  const [username, setUsername] = useState('')
  const [avatar_url, setAvatar_url] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  async function getProfile() {
    try {
      const user = supabase.auth.user()
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  async function updateProfile() {
    try {
      const user = supabase.auth.user()
      const updates = {
        id: user.id,
        username,
        // adding ability to update avatar
        avatar_url,
        // adding ability to update admin status
        isAdmin,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="card mx-auto w-96 bg-base-100 p-10 shadow-xl">
      <input
        className="my-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="username"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="my-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="avatar_url"
        placeholder="add an avatar"
        value={avatar_url}
        onChange={(e) => setAvatar_url(e.target.value)}
      />
      <h2>Will you be an Admin?</h2>
      <input
        type="checkbox"
        className="toggle toggle-accent toggle-lg"
        onChange={(e) => setIsAdmin(!isAdmin)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          updateProfile()
        }}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Update profile</span>
      </button>
    </div>
  )
}
