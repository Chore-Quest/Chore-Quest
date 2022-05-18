import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../client'
import Link from 'next/link'
import {
  fetchAllChores,
  addChore,
  deleteChore,
  getFilteredChores,
} from '../store/features/householdChores'
import ChoreFilters from '../components/choreFilters'
import { motion } from 'framer-motion'

export default function AllClanChores() {
  //local state for controlled chore input form
  const [chore, setChore] = useState({
    name: '',
    notes: '',
    // xp: '',
    // isComplete: '',
  })
  const { name, notes } = chore

  //gets the list of chores and loading state from the redux store
  let { allClanChores } = useSelector((store) => store)
  let filteredChores = getFilteredChores(allClanChores)
  let { loading } = allClanChores

  console.log(filteredChores)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllChores())
  }, [])

  useEffect(async () => {
    filteredChores = getFilteredChores(allClanChores)
  }, [allClanChores])

  // Dispatches new chores to the store
  function dispatchChore() {
    dispatch(addChore(chore))
    // Reset the chore details & clears the form data
    setChore({
      name: '',
      notes: '',
      // xp: '',
      // isComplete: '',
    })
  }

  // Display the spinner if loading
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div
          className="
    mt-36
    h-32
    w-32
    animate-spin
    rounded-full border-t-2 border-b-8 border-blue-900
  "
        ></div>
      </div>
    )
  const easing = [0.6, -0.05, 0.01, 0.99]
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  const fadeInUp = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ChoreFilters />

      {/* map over chores and place each into a card */}
      <motion.div
        variants={stagger}
        className="md:grid-row-3 mb-5 gap-4 md:grid md:gap-3"
      >
        {filteredChores[0] &&
          filteredChores.map((chore) => (
            <div
              key={chore.id}
              className="frosted card mb-5 flex flex-row bg-base-100 shadow-xl drop-shadow-2xl"
            >
              <motion.div
                variants={fadeInUp}
                className="card-body flex flex-row items-center justify-center bg-slate-800 align-middle"
              >
                <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                  <h1 className="card-title cursor-pointer">{chore.name}</h1>
                </Link>
                <p>
                  <span className="badge badge-sm badge-ghost">
                    Notes: {chore.notes}
                  </span>
                </p>
                {chore.profiles[0] ? <p className=""></p> : <p>Unassigned</p>}

                <div className="avatar-group -space-x-1">
                  {chore.profiles.map((profile) => (
                    <div className="avatar" key={profile.id}>
                      <div className="w-12 rounded">
                        <img
                          src={profile.avatar_url}
                          alt={`${profile.username} avatar`}
                          title={profile.username}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end">
                  <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                    <label className="swap swap-flip text-xl">
                      <input type="checkbox" />
                      {chore.isComplete ? (
                        <p>
                          <span className="swap-on"> ✅</span>
                        </p>
                      ) : (
                        <p>
                          Incomplete<span className="swap-off"> ❌</span>
                        </p>
                      )}
                    </label>
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
      </motion.div>
    </motion.div>
  )
}
