import { supabase } from '../client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import editprofile from './editprofile'

export default function Profile({ session }) {
  const [username, setUsername] = useState('')
  const [avatar_url, setAvatar_url] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

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
    <div className="container mx-auto grid min-h-screen place-content-center">
      <p>Oh hi there {'PLACEHOLDER NAME'}</p>
      <div class="justifyCenter mask mask-hexagon box-content h-64 w-64">
        <img src="https://api.lorem.space/image/face?hash=33791" />
      </div>
      <button
        className="mt-4 rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        onClick={() => router.push('/editprofile')}
      >
        Edit Profile
      </button>
      <button
        className="mt-4 rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </button>
    </div>
  )
}
