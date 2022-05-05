import { useState, useEffect } from 'react'
import { supabase } from '../client'

export default function Home() {
  // Declare a new state variable to store task details
  const [task, setTask] = useState({
    Name: '',
    Activity: '',
    StartDate: '',
    EndDate: '',
  })

  const { Name, Activity, StartDate, EndDate } = task

  // Create a function that handles the new task creation
  async function addTask() {
    await supabase
      .from('Task') // Select the Table
      .insert([
        {
          Name,
          Activity,
          StartDate,
          EndDate,
        },
      ]) // Insert the new task
      .single()
    setTask({
      Name: '',
      Activity: '',
      StartDate: '',
      EndDate: '',
    }) // Reset the task details
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mt-20 text-4xl font-bold">
            <a className="text-blue-600" href="/">
              Full Stack Application With Tailwind CSS and Supabase in NextJs
            </a>
          </h1>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <div className="mt-6 w-96 rounded-xl border p-8 hover:text-blue-600 focus:text-blue-600">
              <div className="w-full max-w-sm">
                <form className="mb-4 rounded bg-white px-8 pt-6 pb-8">
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="taskName"
                    >
                      Task Name
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="taskName"
                      type="text"
                      value={Name.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="taskActivity"
                    >
                      Task Activity
                    </label>

                    <textarea
                      className="form-textarea focus:shadow-outline mt-1 block w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      rows="3"
                      placeholder="Task Activity"
                      value={Activity.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Activity: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="startDate"
                    >
                      Task Start Date
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="startDate"
                      type="date"
                      value={StartDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, StartDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="endDate"
                    >
                      Task End Date
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="endDate"
                      type="date"
                      value={EndDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, EndDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                      type="button"
                      onClick={addTask} // Call the addTask Function
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-6 w-96 rounded-xl p-2 focus:text-blue-600"></div>
          </div>
        </main>
      </div>
    </div>
  )
}
