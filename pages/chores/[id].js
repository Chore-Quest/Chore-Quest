import { useRouter } from 'next/router'
import SingleChore from '../../components/singleChore'

export default function Chore() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <SingleChore choreId={id} />
    </>
  )
}
