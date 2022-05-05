import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../client'

export default function Home() {
  // Declare a new state variable to store chore details

  // **** Need to add due date to database ****
  const [chore, setChore] = useState({
    name: '',
    notes: '',
    // xp: '',
    // isComplete: '',
  })

  const { name, notes } = chore

  // Create a function that handles the new chore creation
  async function addChore() {
    const { error, data: chores } = await supabase
      .from('Chores') // Select the Table
      .insert([
        {
          name,
          notes,
          // xp,
          // isComplete,
        },
      ]) // Insert the new chore
      .single()
    setChore({
      name: '',
      notes: '',
      // xp: '',
      // isComplete: '',
    }) // Reset the chore details
    if (error) {
      console.log('error.message:')
      console.log(error.message)
      console.log('chores:')
      console.log(chores)
    }
  }

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
                      onClick={addChore} // Call the addChore Function
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
                      Name
                    </th>
                    <th className="border bg-blue-400 px-8 py-4 text-left">
                      Notes
                    </th>
                    <th className="border bg-blue-400 px-14 py-4 text-left">
                      Start Date
                    </th>
                    <th className="border bg-blue-400 px-16 py-4 text-left">
                      End Date
                    </th>

                    <th className="border bg-blue-400 px-4 py-4 text-left">
                      Action
                    </th>
                  </tr>
                  <tr>
                    <td className="border px-4 py-4"></td>
                    <td className="border px-4 py-4"></td>
                    <td className="border px-8 py-4"></td>
                    <td className="border px-8 py-4"></td>
                    <td className="border px-8 py-4"></td>
                    <td className="border px-8 py-4">
                      {' '}
                      <button
                        className="focus:shadow-outline rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
