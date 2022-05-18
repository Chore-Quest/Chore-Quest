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
  console.log(profile, `profile from profile page`)
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
            className="mask mask-circle flex"
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
            <div className="mb-4 flex flex-row justify-center gap-4">
              <button
                className="frosted rounded-lg border-gray-300 bg-gray-500 p-2 pl-5  text-lg text-gray-100 focus:border-4"
                onClick={() => router.push('/editprofile')}
              >
                Edit Profile
              </button>

              <button
                className="frosted focus:shadow-outline rounded  py-2 px-4 font-bold text-white hover:bg-black focus:outline-none"
                type="button"
                onClick={() => router.push('/addchore')}
              >
                Add Chore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
