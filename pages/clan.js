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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProfiles())
  }, [])

  console.log(profiles, 'this is profiles from clan page')
  return (
    <div class="card w-96 bg-base-100 shadow-xl">
      {profiles.map((profile) => (
        <>
          <figure>
            <img src={profile.avatar_url} alt="Profile image" />
          </figure>
          <div class="card-body">
            <h2 class="card-title mx-auto">{profile.username}</h2>
            <p className="mx-auto">profile tag line?</p>
            <div class="card-actions justify-center">
              <Link href="/profile">
                <button class="btn btn-primary">Profile page</button>
              </Link>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default clan
