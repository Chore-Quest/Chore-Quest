import { supabase } from '../client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleProfile } from '../store/features/singleProfile'
import AllClanChores from '../components/allChores'

export default function Profile({ session }) {
  //gets profile from the database
  let [householdName, setHouseholdName] = useState('')
  useEffect(() => {
    dispatch(fetchSingleProfile())
    getHouseholdInfo()
  }, [])

  let { singleProfile } = useSelector((store) => store)
  let [profile, loading] = [singleProfile.profile, singleProfile.loading]

  const dispatch = useDispatch()
  const router = useRouter()

  const getHouseholdInfo = async () => {
    const user = supabase.auth.user()
    try {
      let { data: userID } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single()
      let { data: household } = await supabase
        .from('household_table')
        .select(`*`)
        .eq('id', userID.household_id)
        .single()
      console.log(userID, 'this is user')
      console.log(household, 'this is household')
      setHouseholdName(household.name)
      return household
    } catch (error) {
      console.log(error)
      return error
    }
  }

  return (
    <div className="container min-h-screen">
      <div className="frosted w-296 shadow-3xl card mb-5 items-center justify-start bg-base-100 pt-5 sm:grid-cols-2 sm:p-5 md:grid md:grid-cols-4">
        <div className="h-104 w-104 mask mask-hexagon mr-10">
          <img src={profile ? profile.avatar_url : null} />
        </div>
        <div className="">
          <p>
            <span className="text-4xl">{householdName}</span>
          </p>
          <h1 className="mx-auto">XP:{profile ? profile.personalXP : null}</h1>
          <div className="">
            {/* <h2 className="clan houseName gap-5 justify-self-auto align-middle">
            Clan
          </h2> */}
            <h1 className="houseName ml-1">
              {profile ? profile.username : 'Guest'}
            </h1>
            <div></div>
            <button
              className=" justify-self-center rounded-lg border-blue-300 bg-gray-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
              onClick={() => router.push('/editprofile')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <AllClanChores />
    </div>
  )
}
