import { supabase } from '../client'

import { useState, useEffect } from 'react'

export default function Chores() {
  const [chores, setChores] = useState([])
  const [user, setUser] = useState(null)

  async function displayChores() {
    const { data: chore } = await supabase
      .from('household_table')
      .select('users')

    const user = supabase.auth.user()

    setChores(chore)
    setUser(user)
  }

  useEffect(() => {
    displayChores()
  }, [])

  console.log('chores:', chores)
  console.log('user:', user)
  return (
    <>
      <h1>Chores</h1>
      <ul>
        {chores?.map((chore) => (
          <li key={chore.id}>{chore.name}</li>
        ))}
      </ul>
    </>
  )
}
