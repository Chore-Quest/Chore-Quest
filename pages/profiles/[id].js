import { useRouter } from 'next/router'
import Profile from '../../components/singleProfile'

export default function UserProfile() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Profile userId={id} />
    </>
  )
}
