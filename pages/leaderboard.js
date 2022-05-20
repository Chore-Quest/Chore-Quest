import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchHouseholdInfo,
  fetchAllProfiles,
} from '../store/features/houseProfiles'
import { useDispatch } from 'react-redux'

const Leaderboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProfiles())
  }, [])

  const houseHold = useSelector(
    (store) => store.singleHouseholdProfiles.entities
  )

  console.log(houseHold, 'this is houseHold')
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>XP</th>
            <th></th>
          </tr>
        </thead>
        {houseHold.map((profile, idx) => (
          <tbody key={profile.id}>
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div> {`#${idx + 1}`}</div>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={profile.avatar_url}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {profile.username}
                <br />
              </td>
              <td>{profile.personalXP}</td>
              <th></th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default Leaderboard
