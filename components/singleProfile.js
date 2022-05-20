import { supabase } from '../client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDynamicSingleProfile } from '../store/features/singleProfile'
import UserChores from '../components/chores/userChores'

export default function Profile(props) {
  const { userId } = props

  useEffect(() => {
    dispatch(fetchDynamicSingleProfile(userId))
  }, [userId])

  let profile = useSelector((store) => store.singleProfile.dynamicProfile)
  let { householdInfo } = useSelector((store) => store.singleHouseholdProfiles)

  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <div className="container min-h-screen">
      <div className="frosted w-296 shadow-3xl card mb-5 grid grid-rows-1 items-center justify-center bg-base-100 pt-5 sm:grid-cols-2 sm:p-5">
        <div className="flex justify-center">
          <img
            className="mask mask-hexagon-2 flex"
            src={profile ? profile.avatar_url : null}
          />
        </div>
        <div className="">
          <p>
            <span className="mb-2 flex justify-center text-2xl">
              Clan {householdInfo.householdName}
            </span>
          </p>
          <h1 className="mb-2 flex justify-center">
            XP:{profile ? profile.personalXP : null}
          </h1>
          <div>
            {/* <h2 className="clan houseName gap-5 justify-self-auto align-middle">
            Clan
          </h2> */}
            <h1 className="mb-2 flex justify-center text-2xl">
              {profile ? profile.username : 'Guest'}
            </h1>
          </div>
        </div>
      </div>
      {profile ? <UserChores userId={profile.id} /> : null}
    </div>
  )
}
