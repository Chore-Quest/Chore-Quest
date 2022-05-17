import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchSingleProfile,
  updateSingleProfile,
} from '../store/features/singleProfile'
import Link from 'next/link'

export default function editProfile() {
  const { singleProfile } = useSelector((store) => store)
  const storeProfile = singleProfile.profile
  const [profile, setProfile] = useState({
    username: '',
    avatar_url: '',
    isAdmin: false,
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSingleProfile())
  }, [])
  useEffect(() => {
    if (singleProfile) {
      setProfile({
        username: storeProfile.username || '',
        avatar_url: storeProfile.avatar_url || '',
        isAdmin: storeProfile.isAdmin || false,
      })
    }
  }, [storeProfile])
  return (
    <div className="card mx-auto w-96 bg-base-100 p-10 shadow-xl">
      <input
        className="frosted my-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="username"
        placeholder="Enter a username"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <input
        className="frosted my-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="avatar_url"
        placeholder="add an avatar"
        value={profile.avatar_url}
        onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
      />
      <h2>Will you be an Admin?</h2>
      <input
        type="checkbox"
        checked={profile.isAdmin}
        className="toggle toggle-accent toggle-lg"
        onChange={() => setProfile({ ...profile, isAdmin: !profile.isAdmin })}
      />
      <button
        onClick={() => dispatch(updateSingleProfile({ ...profile }))}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <Link href="/">
          <span>Update profile</span>
        </Link>
      </button>
    </div>
  )
}
