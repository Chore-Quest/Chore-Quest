import { useState, useEffect } from 'react'
import { createChore } from '../store/features/householdChores'
import { fetchSingleProfile } from '../store/features/singleProfile'
import { useSelector, useDispatch } from 'react-redux'
// import TierSelector from '../components/tierSelector'
import { fetchAllItems } from '../store/features/itemTiers'
import { fetchAllProfiles } from '../store/features/houseProfiles'
import Link from 'next/link'

export default function AddChore() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleProfile())
  }, [])

  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  useEffect(() => {
    dispatch(fetchAllProfiles())
  }, [])

  const { singleProfile } = useSelector((store) => store)
  const { household_id } = singleProfile.profile
  const { allItems } = useSelector((store) => store)
  const { entities: items } = allItems
  const { singleHouseholdProfiles: profiles } = useSelector((store) => store)

  const [chore, setChore] = useState({
    name: '',
    notes: '',
    // household_id: '',
    item: '',
    // isComplete: '',
    profile_id: '',
  })
  const { name, notes } = chore

  console.log(chore, 'this is chore')
  function handleAddChore() {
    // setChore({ ...chore, household_id: household_id })
    // if (chore.assignedTo !== '') {
    //   console.log('DISPATCH SOMETHING')
    // }

    dispatch(createChore({ ...chore, household_id }))
    // Reset the chore details & clears the form data
    setChore({
      name: '',
      notes: '',
      // household_id: singleProfile.household_id,
      // item: '',
      // isComplete: '',
    })
  }
  return (
    <form>
      <div>
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="choreName"
        >
          Chore Name
        </label>

        <input
          className="frosted focus:shadow-outline  w-full appearance-none rounded border py-2 px-3 leading-tight  text-gray-400 shadow focus:outline-none"
          id="choreName"
          type="text"
          value={name.toString()}
          onChange={(e) => setChore({ ...chore, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-400"
          htmlFor="choreNotes"
        >
          Chore Notes
        </label>

        <textarea
          className="form-textarea frosted focus:shadow-outline mt-1 block w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-400 shadow focus:outline-none"
          rows="3"
          placeholder="Chore Notes"
          value={notes.toString()}
          onChange={(e) => setChore({ ...chore, notes: e.target.value })}
        ></textarea>
      </div>
      <select
        className="select mb-2 w-full max-w-xs"
        onChange={(e) => setChore({ ...chore, item: e.target.value })}
      >
        <option defaultValue>Select Tier</option>
        {items.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >{`Tier: ${item.tier} ${item.name} ${item.xp} XP`}</option>
        ))}
      </select>

      <select
        className="select mb-2 w-full max-w-xs"
        onChange={(e) => setChore({ ...chore, profile_id: e.target.value })}
      >
        <option defaultValue value="">
          Assign To
        </option>
        {profiles.entities?.map((profile) => (
          <option
            key={profile.id}
            value={profile.id}
          >{`${profile.username}`}</option>
        ))}
      </select>

      <div className="flex items-center justify-between">
        <button
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
          onClick={handleAddChore} // Call the addChore Function
        >
          <Link href="/">Add Chore</Link>
        </button>
      </div>
    </form>
  )
}
