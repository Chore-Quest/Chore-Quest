import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchAllProfilesXP } from '../store/features/houseProfiles'
import { useDispatch } from 'react-redux'

const Leaderboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProfilesXP())
  }, [])

  const houseHold = useSelector(
    (store) => store.singleHouseholdProfiles.entities
  )

  const handleRankBorder = (idx) => {
    if (idx === 0) return 'border-4 border-yellow-500'
    else if (idx === 1) return 'border-2 border-stone-400'
    else if (idx === 2) return 'border-2 border-yellow-900'
    else return ''
  }
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
          <tbody
            // className={`${idx === 0 ? 'border-2 border-yellow-500' : ''}`}
            className={handleRankBorder(idx)}
            key={profile.id}
          >
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
