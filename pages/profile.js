import { Auth, Typography, Button } from '@supabase/ui'
const { Text } = Typography
import { supabase } from '../client'
import Chores from './chores'

function Profile(props) {
  const { user } = Auth.useUser()

  async function getProfile() {
    try {
      const user = supabase.auth.user()
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  if (user) {
    return (
      <>
        <Chores />

        {/* <input
          className="my-4 w-full rounded-xl border-2 border-gray-500 p-4"
          type="username"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            updateProfile()
          }}
          className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        >
          <span>Update profile</span>
        </button> */}

        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign Out
        </Button>
      </>
    )
  }
  return props.children
}

export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Profile>
    </Auth.UserContextProvider>
  )
}
