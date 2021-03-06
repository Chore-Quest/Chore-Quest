import React from 'react'
import { supabase } from '../../client'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProfiles } from '../../store/features/houseProfiles'
import { fetchHouseholdInfo } from '../../store/features/houseProfiles'

const ClanComponent = () => {
  const dispatch = useDispatch()
  let { singleHouseholdProfiles } = useSelector((store) => store)
  let [profiles, profilesLoading, householdInfo] = [
    singleHouseholdProfiles.entities,
    singleHouseholdProfiles.loading,
    singleHouseholdProfiles.householdInfo,
  ]
  useEffect(() => {
    dispatch(fetchAllProfiles())
    return () => {
      dispatch(fetchAllProfiles())
    }
  }, [])

  useEffect(() => {
    if (profiles) {
      dispatch(fetchHouseholdInfo())
    }
    return () => {
      dispatch(fetchHouseholdInfo())
    }
  }, [profiles])

  const easing = [0.6, -0.05, 0.01, 0.99]
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.3,
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
  // Display the spinner if loading
  if (profilesLoading)
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
  if (!profilesLoading)
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className="card hero mx-auto mb-5 overflow-hidden rounded-3xl p-0 drop-shadow-2xl"
          style={{
            backgroundImage: `url(https://www.paintingstar.com/static/gallery/2014/09/20/541d175275c61.jpg?Travellers+In+A+Cart%2Ca+Farmer+With+His+Pigs%2Cand+Other+Country+Folk+On+A+Road+By+A+Castle+Town+Artwork+by+Th%C3%A9obald+Michau)`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md py-10">
              <h1 className="houseName mb-3 text-8xl font-bold">
                {householdInfo && householdInfo.name
                  ? `Clan ${householdInfo.name}`
                  : null}
              </h1>
              <p className="mb-5 items-center">
                Level up and surpass your peers by completing chores and earning
                XP. Your xp will be used to trade for gold and as we know gold
                is PRICELESS.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          variants={stagger}
          className="mb-4 justify-around gap-4 md:grid md:grid-cols-2"
        >
          {profiles &&
            profiles.length &&
            profiles.map((profile) => (
              <motion.div
                variants={fadeInUp}
                key={profile.id}
                className="min-w-200 frosted card mb-5 flex-auto basis-full bg-base-100 p-5 shadow-xl"
              >
                <div className="mb-5">
                  <figure>
                    <img
                      src={profile.avatar_url}
                      alt="Profile image"
                      className="justifyCenter mask mask-hexagon mx-auto h-64 w-64 content-center"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title mx-auto text-2xl">
                      {profile.username}
                    </h2>
                    <p className="mx-auto">{`${profile.personalXP} xp`}</p>
                    <div className="card-actions justify-center">
                      <Link
                        href={`/profiles/${encodeURIComponent(profile.id)}`}
                      >
                        <button className="focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-800 focus:outline-none">
                          Profile page
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    )
}

export default ClanComponent
