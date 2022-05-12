import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchSingleProfile,
  updateSingleProfile,
} from '../store/features/singleProfile'

export default function editProfile({ session }) {
  const [username, setUsername] = useState(singleProfile.profile.username)
  const [avatar_url, setAvatar_url] = useState(singleProfile.profile.avatar_url)
  const [isAdmin, setIsAdmin] = useState(singleProfile.profile.isAdmin)
  const dispatch = useDispatch()

  //fetchSingleProfile gets profile in the database
  useEffect(() => {
    dispatch(fetchSingleProfile())
  }, [])

  const { singleProfile } = useSelector((store) => store)

  // const handleSubmit = () => {
  //   dispatch(updateSingleProfile({ username, avatar_url, isAdmin }))
  // }

  return (
    <>
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
        onChange={() => setIsAdmin(!isAdmin)}
      />
      <button
        onClick={dispatch(
          updateSingleProfile({ username, avatar_url, isAdmin })
        )}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Update profile</span>
      </button>
    </>
  )
}
