import React from 'react'
import { supabase } from '../client'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProfiles } from '../store/features/houseProfiles'

const clan = ({ session }) => {
  let { singleHouseholdProfiles } = useSelector((store) => store)
  let [profiles, loading] = [
    singleHouseholdProfiles.entities,
    singleHouseholdProfiles.loading,
  ]
  let [householdName, setHouseholdName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProfiles())
    getHouseholdInfo()
  }, [])

  // create async function to get info from household_table
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

  console.log(profiles, 'this is profiles from clan page')
  return (
    <>
      <div
        className="card hero mx-auto mb-5 overflow-hidden rounded-3xl p-0 drop-shadow-2xl"
        style={{
          backgroundImage: `url(https://cdn1.vectorstock.com/i/1000x1000/17/20/fantasy-game-background-banner-vector-20381720.jpg)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-3 text-5xl font-bold">House: {householdName}</h1>
            <p className="mb-5">
              Level up and surpass your peers by completing chores and earning
              XP. Your xp will be used to trade for gold and as we know gold is
              PRICELESS.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid-flow-col grid-rows-2 flex-row gap-4 gap-x-3 md:grid">
        {profiles.map((profile) => (
          <div className="min-w-200 frosted grid-col-8 card mask mask-hexagon grid flex-auto basis-full gap-4 bg-base-100 p-5 shadow-xl">
            <div className="col-span-3 col-start-1">
              <figure>
                <img
                  src={profile.avatar_url}
                  alt="Profile image"
                  className="justifyCenter mask mask-hexagon mx-auto h-64 w-64 content-center"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title mx-auto">{profile.username}</h2>
                <p className="mx-auto">profile tag line?</p>
                <div className="card-actions justify-center">
                  <Link href="/profile">
                    <button className="btn btn-primary">Profile page</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default clan
