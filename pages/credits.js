import { useRouter } from 'next/router'
import React from 'react'
import { supabase } from '../client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CreditsPage() {
  const router = useRouter()

  const easing = [0.6, -0.05, 0.01, 0.99]
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.3,
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

  let developers = [
    {
      name: 'Justin Duplain',
      linkedIn: 'https://www.linkedin.com/in/justinduplain/',
      gitHub: 'https://github.com/justinduplain',
      imageURL: 'https://avatars.githubusercontent.com/u/82243533?v=4',
    },
    {
      name: 'Spencer Hamilton',
      linkedIn: 'https://www.linkedin.com/in/speham/',
      gitHub: 'https://github.com/spenham',
      imageURL:
        'https://media-exp1.licdn.com/dms/image/C4D03AQHKtajcPce8Xg/profile-displayphoto-shrink_800_800/0/1517604789767?e=1658361600&v=beta&t=gh9fvUWI0B97aIgUCtvtk-xfVAYqrd7WnmpGdnwxEzU',
    },
    {
      name: 'Christopher Ly',
      linkedIn: 'https://www.linkedin.com/in/christopherly25/',
      gitHub: 'https://github.com/LyChristopherC',
      imageURL:
        'https://media-exp1.licdn.com/dms/image/D4E35AQHyzKgBjeusxg/profile-framedphoto-shrink_800_800/0/1650995970304?e=1653681600&v=beta&t=ui5i-aLgf__Se3LgqmJEWU_12K3KraZKG2ZCM-qOQms',
    },
    {
      name: 'Demetrius Robinson',
      linkedIn: 'https://www.linkedin.com/in/demetriusirobinson/',
      gitHub: 'https://github.com/Illmaticno1',
      imageURL:
        'https://media-exp1.licdn.com/dms/image/D4D35AQFoRphhImpBVw/profile-framedphoto-shrink_800_800/0/1650299572164?e=1653681600&v=beta&t=xaQ6j4C3_--dYUUkxaDDI27HHom_fV2oWeMdbJ0-EGk',
    },
  ]

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="card hero mx-auto mb-5 overflow-hidden rounded-3xl p-0 drop-shadow-2xl"
        style={{
          backgroundImage: `url(https://scontent-ort2-2.xx.fbcdn.net/v/t39.30808-6/244607226_4976383192391443_8852424966271916005_n.png?_nc_cat=108&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=OgqCxFXz9rQAX-k4L_Y&_nc_ht=scontent-ort2-2.xx&oh=00_AT_iqegFFW3LovBxUPocNcsbThneTZwr6dbH7PIawTx-Ow&oe=62897827)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md py-10">
            <h1 className="houseName mb-3 text-8xl font-bold">
              {`The Developers`}
            </h1>
            <p className="mb-5 items-center">
              Learn about the people behind the project
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={stagger}
        className="mb-4 justify-around gap-4 md:grid md:grid-cols-2"
      >
        {developers.map((developer) => (
          <motion.div
            variants={fadeInUp}
            key={developer.name}
            className="min-w-200 frosted card mb-5 flex-auto basis-full bg-base-100 p-5 shadow-xl"
          >
            <div className="mb-5">
              <figure>
                <img
                  src={developer.imageURL}
                  alt="Profile image"
                  className="justifyCenter mask mask-hexagon mx-auto h-64 w-64 content-center"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title mx-auto">{developer.name}</h2>
                <a href={developer.linkedIn} className="mx-auto">
                  <u>LinkedIn</u>
                </a>
                <a href={developer.gitHub} className="mx-auto">
                  <u>GitHub</u>
                </a>
                <div className="card-actions justify-center"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
