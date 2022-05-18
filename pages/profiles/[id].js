import { useRouter } from 'next/router'
import Profile from '../../components/singleProfile'
import { motion } from 'framer-motion'

export default function UserProfile() {
  const router = useRouter()
  const { id } = router.query

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Profile userId={id} />
    </motion.div>
  )
}
