import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHouseholdInfo } from '../store/features/houseProfiles'
import { fetchSingleProfile } from '../store/features/singleProfile'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import CountUp from 'react-countup'
import ProgressProvider from '../components/ProgressProvider'
import UserChores from '../components/chores/userChores'
import { motion } from 'framer-motion'
import ProfileComponent from '../components/thisUserProfile/profileComponent'
export default function Profile({ session }) {
  const dispatch = useDispatch()

  //updates the store with household info
  useEffect(() => {
    dispatch(fetchHouseholdInfo())
    dispatch(fetchSingleProfile())
  }, [])

  let { singleProfile } = useSelector((store) => store)
  let [profile, loading] = [singleProfile.profile, singleProfile.loading]
  let { householdInfo } = useSelector((store) => store.singleHouseholdProfiles)
  const router = useRouter()

  let completed
  profile?.chores?.map((chore) => {
    if (chore.isComplete === true) {
      completed = profile.chores.filter((chore) => chore.isComplete === true)
    }
  })
  let percent = (completed?.length / profile?.chores?.length) * 100

  // export default function ProfilePage() {
  return (
    // <<<<<<< mobileItems
    //     <div className="container min-h-screen">
    //       <div className="frosted w-296 shadow-3xl pr-15 card mb-5 grid grid-rows-1 items-center justify-center bg-base-100 pt-5 sm:grid-cols-2 sm:p-5">
    //         <div className="mb-5 flex justify-around">
    //           <ProgressProvider valueStart={0} valueEnd={percent}>
    //             {(value) => (
    //               <CircularProgressbarWithChildren value={value}>
    //                 <img
    //                   className="h-75 mask mask-circle flex"
    //                   src={profile ? profile.avatar_url : null}
    //                 />
    //               </CircularProgressbarWithChildren>
    //             )}
    //           </ProgressProvider>
    //         </div>

    //         <div className="mb-5 flex justify-center">
    //           <div className="stats flex justify-center shadow">
    //             <div className="stat flex flex-col items-center justify-center">
    //               <p className="">
    //                 <span className="mb-2 flex justify-center text-6xl ">
    //                   Clan {householdInfo?.name ? householdInfo.name : null}
    //                 </span>
    //               </p>
    //               <div className="stat-title">XP</div>
    //               <div className="stat-value">
    //                 {/* {profile ? profile.personalXP : null} */}
    //                 <CountUp
    //                   start={0}
    //                   end={profile ? profile.personalXP : 0}
    //                   delay={0}
    //                 >
    //                   {({ countUpRef }) => (
    //                     <div>
    //                       <span
    //                         ref={countUpRef}
    //                         className=" bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-7xl font-extrabold text-transparent drop-shadow-2xl"
    //                       />
    //                     </div>
    //                   )}
    //                 </CountUp>
    //               </div>
    //               {/* <div className="stat-desc">21% more than last month</div> */}
    //               <h1 className="mb-2 flex justify-center text-4xl">
    //                 {profile ? profile.username : 'Guest'}
    //               </h1>
    //               <div className="mb-4 flex flex-row justify-center gap-4">
    //                 <motion.button
    //                   whileHover={{
    //                     scale: 1.1,
    //                     transition: { duration: 0.2 },
    //                   }}
    //                   whileTap={{ scale: 0.9 }}
    //                   className="frosted rounded-lg border-gray-300 bg-gray-500 p-2 pl-5 text-lg  text-gray-100 hover:bg-black focus:border-4"
    //                   onClick={() => router.push('/editprofile')}
    //                 >
    //                   Edit Profile
    //                 </motion.button>

    //                 <motion.button
    //                   whileHover={{
    //                     scale: 1.1,
    //                     transition: { duration: 0.2 },
    //                   }}
    //                   whileTap={{ scale: 0.9 }}
    //                   className="frosted focus:shadow-outline rounded  py-2 px-4 font-bold text-white hover:bg-black focus:outline-none"
    //                   type="button"
    //                   onClick={() => router.push('/addchore')}
    //                 >
    //                   Add Chore
    //                 </motion.button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {profile ? <UserChores userId={profile.id} /> : null}
    <ProfileComponent />
  )
}
