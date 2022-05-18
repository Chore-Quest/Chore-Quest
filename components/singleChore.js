import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import {
  fetchSingleChore,
  updateSingleChore,
  deleteSingleChore,
} from '../store/features/singleChore'

import { fetchAllProfiles } from '../store/features/houseProfiles'
import {
  createResponsibility,
  fetchUnassigned,
  fetchResponsiblity,
  deleteResponsibility,
} from '../store/features/responsibilities'

export default function SingleChore(props) {
  const { choreId } = props
  const storeChore = useSelector((store) => store.singleChore.chore)
  const profiles = useSelector(
    (store) => store.singleHouseholdProfiles.entities
  )
  const unAssigned = useSelector((store) => store.responsibility.unassigned)
  const assigned = useSelector((store) => store.responsibility.chore)

  // console.log(assigned, 'this is assigned')

  const [chore, setChore] = useState({
    name: '',
    notes: '',
    isComplete: false,
    isAssigned: false,
    xp: 0,
    profiles: [],
    assignedProfiles: [],
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (choreId) {
      dispatch(fetchUnassigned(choreId))
      dispatch(fetchSingleChore(choreId))
      dispatch(fetchResponsiblity(choreId))
    }
  }, [choreId])

  useEffect(() => {
    if (storeChore && storeChore.id) {
      // console.log(storeChore, 'this is storeChore in useEffect')
      setChore({
        name: storeChore.name || '',
        notes: storeChore.notes || '',
        isComplete: storeChore.isComplete || false,
        isAssigned: storeChore.isAssigned || false,
        xp: storeChore.xp || 0,
        profiles: storeChore.profiles || [],
        chore_id: storeChore.id || 0,
        household_id: storeChore.household_id || 0,
        profile_id: 0,
        // assignedProfiles: [],
      })
    }
  }, [storeChore])

  function handleAssignTask() {
    dispatch(createResponsibility(chore))
    setChore({ ...chore, profile_id: 0 })
  }

  function handleUpdateChore() {
    const updateChore = {
      name: chore.name,
      id: choreId,
      notes: chore.notes,
      isComplete: chore.isComplete,
    }
    dispatch(updateSingleChore(updateChore))
  }

  function handleDeleteChore() {
    if (assigned) {
      assigned.map((profile) => {
        console.log(chore.chore_id, 'this is delete chore id')
        dispatch(
          deleteResponsibility({
            profileId: profile.profile_id,
            choreId: chore.chore_id,
          })
        )
      })
    }
    dispatch(deleteSingleChore(choreId))
  }

  //FOR LOOP DELETE CHORE
  // function handleDeleteChore() {
  //   if (assigned) {
  //     for (let i = 0; i < assigned.length; i++) {
  //       dispatch(
  //         deleteResponsibility({
  //           profileId: assigned[i].profile_id,
  //           choreId: chore.chore_id,
  //         })
  //       )
  //     }
  //     dispatch(deleteSingleChore(choreId))
  //   }
  //   dispatch(deleteSingleChore(choreId))
  // }

  console.log(assigned, 'this is assigned')
  return (
    <>
      <div className="frosted w-196 card mx-auto bg-base-100 p-10 shadow-xl">
        <figure>
          {assigned ? (
            assigned.map((profile) => (
              <div
                key={profile.profiles.id}
                className="justifyCenter mask mask-hexagon mx-auto box-content h-64 w-64"
              >
                <img
                  key={profile.profiles.id}
                  src={profile.profiles.avatar_url}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </figure>
        <label>Chore Name</label>
        <input
          className="frosted my-4 w-full rounded-xl border-2 border-gray-500 p-4"
          type="text"
          placeholder="Chore Name"
          value={chore.name}
          onChange={(e) => setChore({ ...chore, name: e.target.value })}
        />
        <label>Chore Notes</label>
        <input
          className="frosted my-4 w-full rounded-xl border-2 border-gray-500 p-4"
          type="text"
          placeholder="Chore Name"
          value={chore.notes}
          onChange={(e) => setChore({ ...chore, notes: e.target.value })}
        />
        <label>Completed</label>
        <input
          type="checkbox"
          checked={chore.isComplete}
          className="toggle toggle-accent toggle-lg"
          onChange={() => setChore({ ...chore, isComplete: !chore.isComplete })}
        />

        {assigned.length > 0 ? (
          assigned.map((profile) => (
            <div key={profile.id}>
              {/* {console.log(chore, 'this is chore')} */}
              <label>Currently Assigned to: {profile.profiles.username}</label>
              <button
                onClick={() => {
                  console.log(profile.profile_id, 'profileid wth')
                  dispatch(
                    deleteResponsibility({
                      profileId: profile.profile_id,
                      choreId: chore.chore_id,
                    })
                  )
                }}
                className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
              >
                X
              </button>
            </div>
          ))
        ) : (
          <label>Currently Not Assigned</label>
        )}
        <select
          className="select w-full max-w-xs"
          onChange={(e) => setChore({ ...chore, profile_id: e.target.value })}
        >
          <option defaultValue={0}>Assign To</option>
          {unAssigned.map((profile) => (
            <option
              key={profile.id}
              value={profile.id}
            >{`${profile.username}`}</option>
          ))}
        </select>
        <button
          onClick={handleAssignTask}
          className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        >
          Assign Now
        </button>
        <button
          onClick={handleUpdateChore}
          className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        >
          <span>Update Chore</span>
        </button>
        <div>
          <Link href="/chores">
            <button
              onClick={handleDeleteChore}
              className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
            >
              <span>Delete</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
