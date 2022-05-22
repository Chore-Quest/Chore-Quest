import { useRouter } from 'next/router'
import SingleUserItem from '../../components/items/singleUserItem'

export default function UserItems() {
  const router = useRouter()
  const { userItemId } = router.query

  if (userItemId) {
    return <SingleUserItem userItemId={userItemId} />
  }
  return null
}
