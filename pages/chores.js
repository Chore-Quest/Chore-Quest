import { supabase } from '../client'
import { useState, useEffect } from 'react'

export default function Chores() {
  const [chores, setChores] = useState([])
  const [user, setUser] = useState(null)

  async function displayChores() {
    const { data: chore } = await supabase.from('household_table').select(`
      authUsers_id,
      chores (
        name
      )
      `)

    const user = supabase.auth.user()
    console.log(user)

    setChores(chore)
    setUser(user)
  }

  useEffect(() => {
    displayChores()
  }, [])

  return (
    <>
      <h1>Chores</h1>
      <ul>
        {chores &&
          chores.map((chore) => (
            <>
              {chore.authUsers_id === user?.id && (
                <li key={chore.id}>
                  {chore.chores.name}
                  {/* <button
                  onClick={() => {
                    supabase.from('chores').delete().eq('id', chore.id)
                    displayChores()
                  }}
                >
                  Delete
                </button> */}
                </li>
              )}
            </>
          ))}
      </ul>
    </>
  )
}
