import { supabase } from '../client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDynamicSingleProfile } from '../store/features/singleProfile'
import AllClanChores from '../components/chores/allChores'

export default function Profile(props) {
  const { userId } = props

  //gets profile from the database
  let [householdName, setHouseholdName] = useState('')

  useEffect(() => {
    dispatch(fetchDynamicSingleProfile(userId))
    getHouseholdInfo()
  }, [userId])

  let profile = useSelector((store) => store.singleProfile.dynamicProfile)

  const dispatch = useDispatch()
  const router = useRouter()

  const getHouseholdInfo = async () => {
    const user = supabase.auth.user()
    try {
      let { data: userID } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', userId)
        .single()
      let { data: household } = await supabase
        .from('household_table')
        .select(`*`)
        .eq('id', userID.household_id)
        .single()
      setHouseholdName(household.name)
      return household
    } catch (error) {
      console.log(error)
      return error
    }
  }

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
              Clan {householdName}
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
      <AllClanChores />
    </div>
  )
}
