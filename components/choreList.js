import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import {
  fetchAllChores,
  addChore,
  deleteChore,
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
  let { allChores } = useSelector((store) => store)
  let [chores, loading] = [allChores.entities, allChores.loading]
  // console.log(chores, 'this is chores from store')
  const dispatch = useDispatch()
  //fetchAllChores gets chores in the database
  useEffect(() => {
    dispatch(fetchAllChores())
  }, [])

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
      {/* map over chores and place each into a card */}
      <div className="mb-5 gap-4 md:grid md:grid-cols-3 md:gap-3">
        {chores.length &&
          chores.map((chore) => (
            <>
              <div
                className="md:min-w-300 frosted card basis-full bg-base-100  shadow-xl"
                key={chore.id}
              >
                <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                  <figure className="cursor-pointer" key={chore.id}>
                    {chore.profiles.map((profile) => (
                      <div
                        className="mask mask-hexagon  box-content h-64 w-64 align-middle"
                        key={profile.id}
                      >
                        <img key={profile.id} src={profile.avatar_url} />
                        <h2>{}</h2>
                      </div>
                    ))}
                  </figure>
                </Link>
                <div className="card-body flex justify-center bg-slate-800 align-middle">
                  <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                    <h1 className="card-title cursor-pointer">{chore.name}</h1>
                  </Link>
                  <p>
                    <span className="badge badge-sm badge-ghost">
                      Notes: {chore.notes}
                    </span>
                  </p>

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
            </>
          ))}
      </div>

      <Link href="/addchore">
        <button
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
        >
          Add Chore
        </button>
      </Link>
    </>
  )
}
