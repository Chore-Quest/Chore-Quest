import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import Link from 'next/link'
import {
  fetchAllChores,
  getFilteredChores,
  updateFilterType,
  updateFilterCriteria,
} from '../store/features/householdChores'
import ChoreFilters from './choreFilters'

export default function AllClanChores() {
  //gets the list of chores and loading state from the redux store
  let { allClanChores } = useSelector((store) => store)
  let filteredChores = getFilteredChores(allClanChores)
  let { loading } = allClanChores

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllChores())
    //this return statement tells the component what to do when it unmounts
    return () => {
      //clear out the store filters when unmounting
      dispatch(updateFilterType('ALL_CHORES'))
      dispatch(updateFilterCriteria(true))
    }
  }, [])

  useEffect(async () => {
    filteredChores = getFilteredChores(allClanChores)
  }, [allClanChores])

  // Display the spinner if loading
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div
          className="
    mt-36
    h-32
    w-32
    animate-spin
    rounded-full border-t-2 border-b-2 border-blue-500
  "
        ></div>
      </div>
    )

  return (
    <>
      <ChoreFilters />
      {/* map over chores and place each into a card */}
      <div className="mb-5 gap-4 md:grid md:grid-cols-3 md:gap-3">
        {filteredChores[0] ? (
          filteredChores[0] &&
          filteredChores.map((chore) => (
            <div
              key={chore.id}
              className="frosted card mb-5 bg-base-100 shadow-xl drop-shadow-2xl"
            >
              <div className="card-body flex justify-center bg-slate-800 align-middle">
                <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                  <h1 className="card-title cursor-pointer">{chore.name}</h1>
                </Link>
                <p>
                  <span className="badge badge-sm badge-ghost">
                    Notes: {chore.notes}
                  </span>
                </p>
                {chore.profiles[0] ? <p>Assigned to:</p> : <p>Unassigned</p>}

                <div className="avatar-group -space-x-1">
                  {chore.profiles.map((profile) => (
                    <div className="avatar" key={profile.id}>
                      <div className="w-12 rounded">
                        <img
                          src={profile.avatar_url}
                          alt={`${profile.username} avatar`}
                          title={profile.username}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end">
                  <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                    <label className="swap swap-flip text-xl">
                      <input type="checkbox" />
                      {chore.isComplete ? (
                        <p>
                          Completed <span className="swap-on"> ✅</span>
                        </p>
                      ) : (
                        <p>
                          Not Completed<span className="swap-off"> ❌</span>
                        </p>
                      )}
                    </label>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div>&nbsp;</div>
            <div className="w-full">
              <h4 className="text-center">
                This user doesn't have any chores.
              </h4>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Link href="/addchore">
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Add Chore
          </button>
        </Link>
      </div>
    </>
  )
}
