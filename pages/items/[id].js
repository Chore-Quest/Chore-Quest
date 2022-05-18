import { useRouter } from 'next/router'
import Items from '../../components/items'

export default function UserItems() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      {/* returning nothing causes deployment error */}
      {/* <Items itemId={id} /> */}
      Item ID: {id}
    </>
  )
}
