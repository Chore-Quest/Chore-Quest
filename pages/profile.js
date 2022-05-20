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
  const percentage = 66

  let completed
  profile.chores?.map((chore) => {
    if (chore.isComplete === true) {
      completed = profile.chores.filter((chore) => chore.isComplete === true)
    }
  })
  let percent = (completed?.length / profile.chores?.length) * 100

  return (
    <div className="container min-h-screen">
      <div className="frosted w-296 shadow-3xl pr-15 card mb-5 grid grid-rows-1 items-center justify-center bg-base-100 pt-5 sm:grid-cols-2 sm:p-5">
        <div className="mb-5 flex justify-around">
          <ProgressProvider valueStart={0} valueEnd={percent}>
            {(value) => (
              <CircularProgressbarWithChildren value={value}>
                <img
                  className="h-75 mask mask-circle flex"
                  src={profile ? profile.avatar_url : null}
                />
              </CircularProgressbarWithChildren>
            )}
          </ProgressProvider>
        </div>

        <div className="mb-5 flex justify-center">
          <div class="stats flex justify-center shadow">
            <div class="stat flex flex-col items-center justify-center">
              <p className="">
                <span className="mb-2 flex justify-center text-6xl ">
                  Clan {householdInfo?.name ? householdInfo.name : null}
                </span>
              </p>
              <div class="stat-title">XP</div>
              <div class="stat-value">
                {/* {profile ? profile.personalXP : null} */}
                <CountUp
                  start={0}
                  end={profile ? profile.personalXP : 0}
                  delay={0}
                >
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
      {profile ? <UserChores userId={profile.id} /> : null}
    </div>
  )
}
