import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProfiles } from '../store/features/houseProfiles'
import {
  updateFilterType,
  updateFilterCriteria,
} from '../store/features/householdChores'

export default function ChoreFilters() {
  const ALL_CHORES = 'ALL_CHORES'
  const IS_COMPLETE = 'IS_COMPLETE'
  const IS_INCOMPLETE = 'IS_INCOMPLETE'
  const PROFILE_ID = 'PROFILE_ID'
  const UNASSIGNED = 'UNASSIGNED'

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProfiles())
  }, [])
  let clanProfiles = useSelector(
    (store) => store.singleHouseholdProfiles.entities
  )

  function handleFilterChange(e) {
    let { filterType, filterCriteria } = JSON.parse(e.target.value)
    dispatch(updateFilterType(filterType))
    dispatch(updateFilterCriteria(filterCriteria))
  }

  return (
    <>
      <div className="my-3 flex flex-row justify-center">
        <select className="select" onChange={(e) => handleFilterChange(e)}>
          <option
            value={JSON.stringify({
              filterType: ALL_CHORES,
              filterCriteria: 0,
            })}
          >
            All Clan Chores
          </option>
          <option
            value={JSON.stringify({
              filterType: IS_INCOMPLETE,
              filterCriteria: 0,
            })}
          >
            Incomplete
          </option>
          <option
            value={JSON.stringify({
              filterType: IS_COMPLETE,
              filterCriteria: 0,
            })}
          >
            Completed
          </option>
          <option
            value={JSON.stringify({
              filterType: UNASSIGNED,
              filterCriteria: 0,
            })}
          >
            Unassigned
          </option>
          {clanProfiles && clanProfiles[0]
            ? clanProfiles.map((profile) => (
                <option
                  key={profile.id}
                  value={JSON.stringify({
                    filterType: PROFILE_ID,
                    filterCriteria: profile.id,
                  })}
                >
                  Clan Member: {profile.username}
                </option>
              ))
            : null}
        </select>
      </div>
    </>
  )
}
