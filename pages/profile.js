import { supabase } from '../client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleProfile } from '../store/features/singleProfile'

export default function Profile({ session }) {
  //gets profile from the database
  useEffect(() => {
    dispatch(fetchSingleProfile())
  }, [])

  let { singleProfile } = useSelector((store) => store)
  let [profile, loading] = [singleProfile.profile, singleProfile.loading]

  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <div className="card w-96 bg-base-100 p-10 shadow-xl">
        <p className="mx-auto">
          Oh hi there {profile ? profile.username : 'Guest'}
        </p>
        <div className="justifyCenter mask mask-hexagon mx-auto box-content h-64 w-64">
          <img src={profile ? profile.avatar_url : null} />
        </div>
        <h1 className="mx-auto">XP:{profile ? profile.personalXP : null}</h1>
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
    </div>
  )
}
