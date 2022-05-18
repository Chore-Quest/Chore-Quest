import { useRouter } from 'next/router'
import Items from '../../components/items'
import { motion } from 'framer-motion'

export default function UserItems() {
  const router = useRouter()
  const { id } = router.query

  return (
    // <motion.div
    //   exit={{ opacity: 0 }}
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    // >
    //   <Items itemId={id} />
    // </motion.div>

    <>
      {/* returning nothing causes deployment error */}
      {/* <Items itemId={id} /> */}
      Item ID: {id}
    </>
  )
}
