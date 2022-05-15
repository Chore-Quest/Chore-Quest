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
  let { allClanChores } = useSelector((store) => store)
  let [chores, loading] = [allClanChores.entities, allClanChores.loading]
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
        {chores.length &&
          chores.map((chore) => (
            <>
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

                  <div class="avatar-group -space-x-1">
                    {chore.profiles.map((profile) => (
                      <div class="avatar">
                        <div class="w-16 rounded">
                          <img
                            key={profile.id}
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
            </>
          ))}
      </div>
      <div
        tabIndex="0"
        className="mb-20 columns-1 flex-col rounded-3xl bg-base-100 p-20 shadow-xl drop-shadow-2xl"
      >
        <div
          tabIndex="0"
          className="collapse-arrow collapse rounded-box border border-base-300 bg-base-100"
        >
          <div className="collapse-title text-xl font-medium">
            Focus me to see content
          </div>
          <div className="collapse-content">
            <p>tabIndex="0" attribute is necessary to make the div focusable</p>
          </div>
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
      </div>
      {/* <table className="table-zebra table-normal mx-auto mb-20 table rounded-3xl">
        <thead className="rounded-3xl">
          <th className="px-4 py-4">name</th>
          <th className="px-4 py-4">Chore</th>
          <th className="px-4 py-4">Due Date</th>
          <th className="px-4 py-4">XP</th>
          <th className="px-4 py-4">Delete</th>
          <th className="px-4 py-4">Edit Chore</th>
        </thead>
        <tbody>
          {
            //if there are chores, map through and display them
            chores &&
              chores.map((chore, index) => (
                <tr key={chore.id} className="hover">
                  {console.log(chores)}
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={chore.profiles.avatar_url}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{chore.profiles.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {chore.chores.name}
                    <br />
                    <span className="badge badge-sm badge-ghost">
                      Notes: {chore.chores.notes}
                    </span>
                  </td>
                  <td className="px-8 py-4">{chore.chores.dueDate}</td>
                  <td className="px-8 py-4">{chore.chores.xp}</td>
                  <td className="px-8 py-4">
                    <button
                      className="focus:shadow-outline rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none"
                      type="button"
                      // Deletes the chore
                      onClick={() => dispatch(deleteChore(chore.id))}
                    >
                      Delete
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      className="btn btn-warning"
                      type="button"
                      // Deletes the chore
                      onClick={() => dispatch(deleteChore(chore.id))}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table> */}
    </>
  )
}
