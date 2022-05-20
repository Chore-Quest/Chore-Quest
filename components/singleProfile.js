import { supabase } from '../client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDynamicSingleProfile } from '../store/features/singleProfile'
import UserChores from '../components/chores/userChores'
import ProgressProvider from '../components/ProgressProvider'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

export default function Profile(props) {
  const { userId } = props

  useEffect(() => {
    dispatch(fetchDynamicSingleProfile(userId))
  }, [userId])

  let profile = useSelector((store) => store.singleProfile.dynamicProfile)
  let { householdInfo } = useSelector((store) => store.singleHouseholdProfiles)

  const dispatch = useDispatch()
  const router = useRouter()

  let completed
  profile?.chores?.map((chore) => {
    if (chore.isComplete === true) {
      completed = profile.chores.filter((chore) => chore.isComplete === true)
    }
  })

  let percent = (completed?.length / profile?.chores?.length) * 100

  return (
    <div className="container min-h-screen">
      <div className="frosted w-296 shadow-3xl pr-15 card mb-5 grid grid-rows-1 items-center justify-center bg-base-100 pt-5 sm:grid-cols-2 sm:p-5">
        <div className="mb-5 flex justify-around">
          <img
            className="h-75 mask mask-circle flex"
            src={profile ? profile.avatar_url : null}
          />
          <ProgressProvider valueStart={0} valueEnd={percent}>
            {(value) => (
              <CircularProgressbarWithChildren
                value={value}
              ></CircularProgressbarWithChildren>
            )}
          </ProgressProvider>
        </div>

        <div className="mb-5 flex justify-center">
          <div className="stats flex justify-center shadow">
            <div className="stat flex flex-col items-center justify-center">
              <p className="">
                <span className="mb-2 flex justify-center text-6xl ">
                  Clan {householdInfo?.name ? householdInfo.name : null}
                </span>
              </p>
              <div className="stat-title">XP</div>
              <div className="stat-value">
                {/* {profile ? profile.personalXP : null} */}
                <CountUp start={0} end={profile?.personalXP} delay={0}>
                  {({ countUpRef }) => (
                    <div>
                      <span
                        ref={countUpRef}
                        className=" bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-7xl font-extrabold text-transparent drop-shadow-2xl"
                      />
                    </div>
                  )}
                </CountUp>
              </div>
              {/* <div class="stat-desc">21% more than last month</div> */}
              <h1 className="mb-2 flex justify-center text-4xl">
                {profile ? profile.username : 'Guest'}
              </h1>
            </div>
          </div>
        </div>
      </div>{' '}
      {profile ? <UserChores userId={profile.id} /> : null}
    </div>
  )
}
