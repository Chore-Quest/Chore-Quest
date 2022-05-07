import React from 'react'
import Link from 'next/link'
import CrestSvg from './crest'

export function Nav({ user }) {
  return (
    <nav className="w-15 justify-content-center flex h-screen flex-col items-center rounded-br-3xl border border-gray-700 p-4">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 hover:border-gray-500 hover:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg> */}
      <CrestSvg />
      <div className="text-3xl font-black transition duration-200 hover:text-red-900 hover:ease-in">
        <h1>Chore</h1>
        <h1>Quest</h1>
      </div>

      <Link href="/">
        <span className=" mx-auto my-5 cursor-pointer rounded-md border p-5 hover:border-gray-500 hover:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </span>
      </Link>
      {user && (
        <>
          <Link href="/create-post">
            <span className="mx-auto my-5 cursor-pointer rounded-md border p-5 hover:border-gray-500 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </Link>
          <Link href="/clan">
            <span className="mx-auto my-5 cursor-pointer rounded-md border p-5 hover:border-gray-500 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
          </Link>
        </>
      )}
      <Link href="/profile">
        <span className="mx-auto my-5 cursor-pointer rounded-md border p-5 hover:border-gray-500 hover:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
      </Link>
    </nav>
  )
}
