import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserProfileHero from './userProfileHero'
import UserChores from '../chores/userChores'
import { fetchHouseholdInfo } from '../../store/features/houseProfiles'
import { fetchSingleProfile } from '../../store/features/singleProfile'

export default function ProfilePage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHouseholdInfo())
    dispatch(fetchSingleProfile())
    return () => {
      dispatch(fetchHouseholdInfo())
      dispatch(fetchSingleProfile())
    }
  }, [])

  let { singleProfile, singleHouseholdProfiles } = useSelector((store) => store)
  let [profile, profileLoading] = [singleProfile.profile, singleProfile.loading]
  let [householdInfo, householdLoading] = [
    singleHouseholdProfiles.householdInfo,
    singleHouseholdProfiles.loading,
  ]

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
  const easing = [0.6, -0.05, 0.01, 0.99]
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  const fadeInUp = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  }
  //after loading, display content components
  if (!profileLoading && !householdLoading)
    return (
      <div className="container min-h-screen">
        <UserProfileHero householdInfo={householdInfo} profile={profile} />
        {profile && profile.id ? <UserChores userId={profile.id} /> : null}
      </div>
    )
}
