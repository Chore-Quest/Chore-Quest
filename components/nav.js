import React from 'react'
import Link from 'next/link'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleProfile } from '../store/features/singleProfile'

<<<<<<< HEAD
export default function Nav({ user }) {
=======
export default function Nav() {
  const { singleProfile } = useSelector((store) => store)
  const storeProfile = singleProfile.profile
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSingleProfile())
  }, [])
>>>>>>> main
  const router = useRouter()
  return (
    <nav className="navbar sticky top-0 left-0 right-0 z-50 rounded-b-lg border-b border-gray-500 bg-base-300 px-8 py-1">
      <div className="navbar-start">
        <div className="flex-1">
          {router.pathname !== '/' && (
            <button onClick={() => router.back()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="navbar-center">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            Chore Quest
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex-none gap-2">
          {storeProfile.id ? (
            <div className="dropdown-end dropdown">
              <label tabIndex="0" className="avatar btn btn-ghost btn-circle">
                <div className="w-10 rounded-full">
                  <img src={storeProfile.avatar_url} />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-300 p-2 shadow-md"
              >
                <li>
                  <Link href="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/allchores">All Chores</Link>
                </li>
                <li>
                  <Link href="/clan">Clan</Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
