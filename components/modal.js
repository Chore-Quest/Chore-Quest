import react from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Login from './login'
import SignIn from '../pages/signInPage'
import SignUp from '../pages/signUpPage'
import { useState } from 'react'
import { MagicLink } from './magicLink'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const Modal = ({ showModal, setShowModal }) => {
  const [showLogin, setShowLogIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showMagicLink, setShowMagicLink] = useState(false)

  const handleSignIn = () => {
    setShowLogIn(true)
    setShowSignUp(false)
    setShowMagicLink(false)
  }

  const handleSignUp = () => {
    setShowLogIn(false)
    setShowSignUp(true)
    setShowMagicLink(false)
  }

  const handleMagicLink = () => {
    setShowLogIn(false)
    setShowSignUp(false)
    setShowMagicLink(true)
  }

  const router = useRouter()

  const handleCredits = () => {
    router.push('/credits')
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="backdrop mx-auto flex min-h-screen flex-col"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          // onClick={() => setShowModal(false)}
        >
          <div className="container flex flex-col content-center items-center px-12 pb-8">
            <img className="w-42" src="title-text-icon.png" alt="Chore Quest" />
            <p className="px-6 pt-2 text-center">
              Chore Quest is a platform for families to gamify chore
              assignments. Take a test drive by entering email
              'test@chore.quest' and password 'ChoreQuest1'.
            </p>
          </div>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="container mx-auto px-8"
          >
            <div className="flex flex-row flex-wrap items-center justify-center">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                className="frosted formFont btn hover:bg-black active:bg-black"
                onClick={handleSignIn}
              >
                <p>Sign In</p>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                className="frosted formFont btn hover:bg-black"
                onClick={handleSignUp}
              >
                <p>Sign Up</p>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                className="frosted formFont btn hover:bg-black"
                onClick={handleMagicLink}
              >
                <p>Magic Link</p>
              </motion.button>
            </div>
            {showLogin && <SignIn />}
            {showSignUp && <SignUp />}
            {showMagicLink && <MagicLink />}
          </motion.div>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className="frosted formFont btn mt-4 hover:bg-black"
            onClick={handleCredits}
          >
            <p>Credits</p>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
