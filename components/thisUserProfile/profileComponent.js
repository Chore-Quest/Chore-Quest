import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserProfileHero from './userProfileHero'
import UserChores from '../chores/userChores'
import { fetchHouseholdInfo } from '../../store/features/houseProfiles'
import { fetchSingleProfile } from '../../store/features/singleProfile'

export default function ProfilePage() {
  const dispatch = useDispatch()

  let { singleProfile, singleHouseholdProfiles } = useSelector((store) => store)
  let [profile, profileLoading] = [singleProfile.profile, singleProfile.loading]
  let [householdInfo, householdLoading] = [
    singleHouseholdProfiles.householdInfo,
    singleHouseholdProfiles.loading,
  ]

  useEffect(() => {
    dispatch(fetchSingleProfile())
    return () => {
      dispatch(fetchSingleProfile())
    }
  }, [])

  useEffect(() => {
    if (profile && profile.id) {
      dispatch(fetchHouseholdInfo())
    }
    return () => {
      dispatch(fetchHouseholdInfo())
    }
  }, [profile])

  // Display the spinner if loading
  if (profileLoading || householdLoading)
    return (
      <div className="flex items-center justify-center">
        <div
          className="
    mt-36
    h-32
    w-32
    animate-spin
    rounded-full border-t-2 border-b-8 border-blue-900
  "
        ></div>
      </div>
    )
  //after loading, display content components
  if (!profileLoading && !householdLoading)
    return (
      <div className="container min-h-screen">
        <UserProfileHero householdInfo={householdInfo} profile={profile} />
        {profile && profile.id ? <UserChores userId={profile.id} /> : null}
      </div>
    )
}
