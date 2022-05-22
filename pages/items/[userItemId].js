import { useRouter } from 'next/router'
import SingleUserItem from '../../components/items/singleUserItem'

export default function UserItems() {
  const router = useRouter()
  const { userItemId } = router.query

  return <SingleUserItem userItemId={userItemId} />
}
