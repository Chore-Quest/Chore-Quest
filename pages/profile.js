import { Auth, Typography, Button } from '@supabase/ui'
const { Text } = Typography
import { supabase } from '../client'
import Chores from './chores'
import UserProfileCard from './userProfileCard'

function Profile(props) {
  const { user } = Auth.useUser()
  if (user) {
    return (
      <>
        {/*
        Profile image
        Name
        XP Display
        Household
        */}

        <UserProfileCard />
        {/* A single user's chores*/}
        <Chores />

        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign Out
        </Button>
      </>
    )
  }
  console.log('props children')
  console.log(props.children)
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
