import { useRouter } from 'next/router'
import SingleChore from '../../components/chores/singleChore'
import { motion } from 'framer-motion'
export default function Chore() {
  const router = useRouter()
  const { id } = router.query

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SingleChore choreId={id} />
    </motion.div>
  )
}
