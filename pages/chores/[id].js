import { useRouter } from 'next/router'
import SingleChore from '../../components/editChore'

export default function SingleChore() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h3>This is the chore id {id}</h3>
      <SingleChore choreId={id} />
    </>
  )
}
