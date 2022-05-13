import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import { fetchSingleChore } from '../store/features/singleChore'
import { updateSingleChore } from '../store/features/singleChore'

export default function SingleChore(props) {
  const { choreId } = props
  const storeChore = useSelector((store) => store.singleChore.chore)
  const [chore, setChore] = useState({
    name: '',
    notes: '',
    isComplete: false,
    isAssigned: false,
    xp: 0,
    profiles: [],
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (choreId) {
      dispatch(fetchSingleChore(choreId))
    }
  }, [choreId])

  useEffect(() => {
    if (storeChore && storeChore.id) {
      console.log(storeChore, 'this is storeChore in useEffect')
      setChore({
        name: storeChore.name || '',
        notes: storeChore.notes || '',
        isComplete: storeChore.isComplete || false,
        isAssigned: storeChore.isAssigned || false,
        xp: storeChore.xp || 0,
        profiles: storeChore.profiles || [],
      })
    }
  }, [storeChore])

  return (
    <>
      <div className="card mx-auto w-96 bg-base-100 p-10 shadow-xl">
        <figure>
          {chore.profiles[0] &&
            chore.profiles.map((profile) => (
              <img key={profile.id} src={profile.avatar_url} />
            ))}
        </figure>
        <label>Chore Name</label>
        <input
          className="my-4 w-full rounded-xl border-2 border-gray-500 p-4"
          type="text"
          placeholder="Chore Name"
          value={chore.name}
          onChange={(e) => setChore({ ...chore, name: e.target.value })}
        />
        <label>Chore Notes</label>
        <input
          className="my-4 w-full rounded-xl border-2 border-gray-500 p-4"
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
        <button
          onClick={() =>
            dispatch(
              updateSingleChore({
                name: chore.name,
                id: choreId,
                notes: chore.notes,
                isComplete: chore.isComplete,
              })
            )
          }
          className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        >
          <span>Update Chore</span>
        </button>
      </div>
    </>
  )
}
