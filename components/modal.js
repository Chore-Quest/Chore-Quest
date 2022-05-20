import react from 'react'
import Link from 'next/link'
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

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="backdrop mx-auto"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          // onClick={() => setShowModal(false)}
        >
          <motion.div onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center justify-center">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                className="frosted formFont hover:bg-black active:bg-black"
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
                className="frosted formFont hover:bg-black"
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
                className="frosted formFont hover:bg-black"
                onClick={handleMagicLink}
              >
                <p>Magic Link</p>
              </motion.button>
            </div>
            {showLogin && <SignIn />}
            {showSignUp && <SignUp />}
            {showMagicLink && <MagicLink />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
