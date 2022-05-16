import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import {
  fetchAllChores,
  addChore,
  deleteChore,
  getFilteredChores,
} from '../store/features/householdChores'
import Link from 'next/link'

export default function AllClanChores() {
  // **** Need to add due date to database ****

  //local state for controlled chore input form
  const [chore, setChore] = useState({
    name: '',
    notes: '',
    // xp: '',
    // isComplete: '',
  })
  const { name, notes } = chore

  //gets the list of chores and loading state from the redux store
  let { allClanChores } = useSelector((store) => store)
  let [chores, loading] = [allClanChores.entities, allClanChores.loading]
  // console.log(chores, 'this is chores from store')
  const dispatch = useDispatch()
  //fetchAllChores gets chores in the database
  useEffect(() => {
    dispatch(fetchAllChores())
  }, [])
  useEffect(async () => {
    let filteredChores = getFilteredChores(allClanChores, {
      filterType: 'PROFILE_ID',
      filterCriteria: 'L:KJSDF:LKJDSF:LKj',
    })
    // console.log(filteredChores, 'this is filtered chores')
  }, [allClanChores])

  console.log(chores, 'this is chores')
  // Dispatches new chores to the store
  function dispatchChore() {
    dispatch(addChore(chore))
    // Reset the chore details & clears the form data
    setChore({
      name: '',
      notes: '',
      // xp: '',
      // isComplete: '',
    })
  }

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
      <div
        className="card hero mx-auto mb-5 overflow-hidden rounded-3xl p-0 drop-shadow-2xl"
        style={{
          backgroundImage: `url(https://img.nerdburglars.net/wp-content/uploads/2020/04/spartan-3696073_1920-e1585934263741-696x381.jpg)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-3 text-5xl font-bold">Chores</h1>
            <p className="mb-5">
              Here is the list of items you need to complete in order to LEVEL
              UP!
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
      {/* map over chores and place each into a card */}
      <div className="columns-3xs">
        {chores[0] &&
          chores.map((chore) => (
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
                </div>
              </div>
            </div>
          ))}
      </div>
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
            onClick={dispatchChore} // Call the addChore Function
          >
            Add Chore
          </button>
        </div>
      </form>
    </>
  )
}
