import { useRouter } from 'next/router'
import Items from '../../components/items/userItems'

export default function UserItems() {
  const router = useRouter()

  return (
    <>
      <Items />
    </>
  )
}
