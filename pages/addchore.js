import { useState, useEffect } from 'react'
import { addChore } from '../store/features/adminChores'
import { fetchSingleProfile } from '../store/features/singleProfile'
import { useSelector, useDispatch } from 'react-redux'

export default function AddChore() {
  const { singleProfile } = useSelector((store) => store)
  const { household_id } = singleProfile.profile

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSingleProfile())
  }, [])
  // console.log(household_id, 'this is singleProf')
  const [chore, setChore] = useState({
    name: '',
    notes: '',
    household_id: household_id,
    // xp: '',
    // isComplete: '',
  })
  const { name, notes } = chore
  console.log(chore, 'this is chore')
  function handleAddChore() {
    dispatch(addChore(chore))
    // Reset the chore details & clears the form data
    setChore({
      name: '',
      notes: '',
      // household_id: singleProfile.household_id,
      // xp: '',
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
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="choreName"
          type="text"
          value={name.toString()}
          onChange={(e) => setChore({ ...chore, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="choreNotes"
        >
          Chore Notes
        </label>

        <textarea
          className="form-textarea focus:shadow-outline mt-1 block w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          rows="3"
          placeholder="Chore Notes"
          value={notes.toString()}
          onChange={(e) => setChore({ ...chore, notes: e.target.value })}
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
          onClick={handleAddChore} // Call the addChore Function
        >
          Add Chore
        </button>
      </div>
    </form>
  )
}
