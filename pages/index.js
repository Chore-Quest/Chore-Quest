import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import {
  fetchAllChores,
  addChore,
  deleteChore,
} from '../store/features/allChores'

export default function Home() {
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
    <div className="flex flex-col items-center justify-center py-2">
      <div>
        <Head>
          <title>Chore Quest</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mt-20 text-4xl font-bold">
            <a className="text-blue-600" href="/">
              Chore Quest
            </a>
          </h1>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <div className="mt-6 w-96 rounded-xl border p-8 hover:text-blue-600 focus:text-blue-600">
              <div className="w-full max-w-sm">
                <form className="mb-4 rounded bg-white px-8 pt-6 pb-8">
                  <div className="mb-4">
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
                      onChange={(e) =>
                        setChore({ ...chore, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setChore({ ...chore, notes: e.target.value })
                      }
                    ></textarea>
                  </div>
                  {/* <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="endDate"
                    >
                      Chore End Date
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="endDate"
                      type="date"
                      value={EndDate.toString()}
                      onChange={(e) =>
                        setChore({ ...chore, EndDate: e.target.value })
                      }
                    />
                  </div> */}
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
            </div>
            <div className="mt-6 w-96 rounded-xl p-2 focus:text-blue-600">
              <table className="bg-white shadow-lg">
                <tbody>
                  <tr>
                    <th className="border bg-blue-400 px-4 py-4 text-left">
                      S/N
                    </th>
                    <th className="border bg-blue-400 px-8 py-4 text-left">
                      Chore
                    </th>
                    <th className="border bg-blue-400 px-8 py-4 text-left">
                      Notes
                    </th>
                    <th className="border bg-blue-400 px-14 py-4 text-left">
                      Due Date
                    </th>
                    <th className="border bg-blue-400 px-16 py-4 text-left">
                      XP
                    </th>

                    <th className="border bg-blue-400 px-4 py-4 text-left">
                      Action
                    </th>
                  </tr>
                  {
                    //if there are chores, map through and display them
                    chores &&
                      chores.map((chore, index) => (
                        <tr key={chore.id}>
                          <td className="border px-4 py-4">{index + 1}</td>
                          <td className="border px-4 py-4">{chore.name}</td>
                          <td className="border px-8 py-4">{chore.notes}</td>
                          <td className="border px-8 py-4">{chore.dueDate}</td>
                          <td className="border px-8 py-4">{chore.xp}</td>
                          <td className="border px-8 py-4">
                            {' '}
                            <button
                              className="focus:shadow-outline rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none"
                              type="button"
                              // Deletes the chore
                              onClick={() => dispatch(deleteChore(chore.id))}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
