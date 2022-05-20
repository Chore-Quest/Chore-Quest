import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import {
  fetchAllChores,
  updateFilterType,
  updateFilterCriteria,
  getFilteredChores,
} from '../../store/features/householdChores'

export default function UserChores(props) {
  const { userId } = props

  let { singleProfile } = useSelector((store) => store)
  let [profile, loading] = [singleProfile.profile, singleProfile.loading]

  let allClanChores = useSelector((store) => store.allClanChores)
  let userChores = getFilteredChores(allClanChores)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllChores())
    return () => {
      //clear out the store filters when unmounting
      dispatch(updateFilterType('ALL_CHORES'))
      dispatch(updateFilterCriteria(true))
    }
  }, [])

  useEffect(() => {
    if (userId && allClanChores) {
      dispatch(updateFilterType('PROFILE_ID'))
      dispatch(updateFilterCriteria(userId))
      userChores = getFilteredChores(allClanChores)
    }
  }, [allClanChores])

  const easing = [0.6, -0.05, 0.01, 0.99]
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.4,
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
      className=""
    >
      <div>
        <h3 className="mb-3 flex items-center justify-center  text-center text-4xl font-extrabold uppercase mix-blend-lighten">
          Chores
        </h3>
      </div>
      <motion.div
        variants={stagger}
        className="md:grid-row-2 gap-4 md:grid md:gap-3"
      >
        {userChores ? (
          userChores.map((chore) => (
            <div
              key={chore.id}
              className="frosted card mb-5 flex flex-row bg-base-100 shadow-xl drop-shadow-2xl"
            >
              <motion.div
                variants={fadeInUp}
                className="card-body flex flex-row items-center justify-center bg-slate-800 align-middle"
              >
                <Link href={`/chores/${encodeURIComponent(chore.id)}`}>
                  <h1 className="card-title flex cursor-pointer items-center justify-center">
                    {chore.name}
                  </h1>
                </Link>
                <p>
                  <span className="badge badge-sm badge-ghost flex items-center justify-center">
                    Notes: {chore.notes}
                  </span>
                </p>
                {chore.profiles[0] ? <p className=""></p> : <p>Unassigned</p>}

                <div className="mask avatar-group mask-circle w-16 -space-x-5">
                  {chore.profiles.map((profile) => (
                    <div className="" key={profile.id}>
                      <div className="rounded">
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
                    <label className="swap swap-flip text-4xl">
                      <input type="checkbox" />
                      {chore.isComplete ? (
                        <p>
                          <span className="swap-on"> ✅</span>
                        </p>
                      ) : (
                        <p>
                          <span className="swap-off"> ❌</span>
                        </p>
                      )}
                    </label>
                  </Link>
                </div>
              </motion.div>
            </div>
          ))
        ) : (
          <>
            <div>&nbsp;</div>
            <div className="w-full">
              <h4 className="text-center">
                This user doesn't have any chores.
              </h4>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
