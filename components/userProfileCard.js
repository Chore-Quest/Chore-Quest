import { supabase } from '../client'
import { useState, useEffect } from 'react'

export default function UserProfileCard() {
  return (
    <>
      <div className="group relative m-auto md:w-10/12 lg:w-8/12">
        <div
          aria-hidden="true"
          className="absolute top-0 h-full w-full rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
        ></div>
        <div className="relative sm:flex">
          <div className="space-y-8 p-6 pb-20 sm:w-7/12 sm:pb-6">
            <div className="flex items-center justify-between">
              <h5 className="text-xl font-semibold text-gray-700">
                {userProfile.name}
              </h5>
              <div className="relative flex justify-around">
                <div className="flex">
                  <span className="-ml-6 text-xl font-bold text-sky-500">
                    xp
                  </span>
                  <span className="leading-0 text-4xl font-bold text-gray-800">
                    {userProfile.xp}
                  </span>
                </div>
              </div>
            </div>
            <img
              src={userProfile.profileImg}
              width="512"
              height="512"
              className="m-auto w-16"
              alt="premium illustration"
            />
            <p className="text-center text-gray-600">
              Clan: {userProfile.householdName}
            </p>
            <div className="absolute inset-x-0 bottom-6 w-full px-6 sm:static sm:px-0">
              <button
                type="submit"
                title="Submit"
                className="block w-full rounded-xl bg-sky-600 py-3 px-6 text-center transition hover:bg-sky-700 focus:bg-cyan-600 active:bg-sky-800"
              >
                <span className="font-semibold text-white">Start plan</span>
              </button>
            </div>
          </div>

          <div className="-mt-16 pb-20 sm:mt-0 sm:w-5/12 sm:pb-0">
            <div
              className="relative h-full before:absolute
                      before:left-0 before:top-1 before:my-auto before:h-0.5 before:w-full before:rounded-full before:bg-gray-200 sm:pt-0 sm:before:inset-y-0 sm:before:h-[85%] sm:before:w-0.5"
            >
              <div className="relative -mt-1 h-full overflow-x-auto pt-7 pb-6 sm:-ml-1 sm:pl-1">
                <ul className="flex h-full w-max justify-center space-x-2 px-6 sm:w-full sm:flex-col sm:space-x-0 sm:space-y-6 sm:px-8">
                  <li>
                    <div className="relative">
                      <input
                        checked=""
                        hidden=""
                        className="peer"
                        type="radio"
                        name="devs"
                        id="devs20"
                      />
                      <label
                        for="devs20"
                        className="block w-full cursor-pointer rounded-full bg-sky-50 py-2 px-4 text-center text-sky-800 peer-checked:text-sky-600 peer-checked:ring-1 peer-checked:ring-sky-500"
                      >
                        <span className="mx-auto text-sm font-semibold">
                          20 developers
                        </span>
                      </label>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[-2.20rem] z-[1] mx-auto h-6 w-6 scale-0 rounded-full border-8 border-white bg-sky-500 transition peer-checked:scale-100 sm:inset-y-0 sm:left-[-2.70rem] sm:my-auto sm:ml-0"
                      ></div>
                    </div>
                  </li>
                  <li>
                    <div className="relative">
                      <input
                        hidden=""
                        className="peer"
                        type="radio"
                        name="devs"
                        id="devs15"
                      />
                      <label
                        for="devs15"
                        className="block cursor-pointer rounded-full bg-sky-50 py-2 px-4 text-center text-sky-800 peer-checked:text-sky-600 peer-checked:ring-1 peer-checked:ring-sky-500"
                      >
                        <span className="mx-auto block w-max text-sm font-semibold">
                          15 developers
                        </span>
                      </label>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[-2.20rem] z-[1] mx-auto h-6 w-6 scale-0 rounded-full border-8 border-white bg-sky-500 transition peer-checked:scale-100 sm:inset-y-0 sm:left-[-2.70rem] sm:my-auto sm:ml-0"
                      ></div>
                    </div>
                  </li>
                  <li>
                    <div className="relative">
                      <input
                        hidden=""
                        className="peer"
                        type="radio"
                        name="devs"
                        id="devs10"
                      />
                      <label
                        for="devs10"
                        className="block cursor-pointer rounded-full bg-sky-50 py-2 px-4 text-center text-sky-800 peer-checked:text-sky-600 peer-checked:ring-1 peer-checked:ring-sky-500"
                      >
                        <span className="mx-auto block w-max text-sm font-semibold">
                          10 developers
                        </span>
                      </label>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[-2.20rem] z-[1] mx-auto h-6 w-6 scale-0 rounded-full border-8 border-white bg-sky-500 transition peer-checked:scale-100 sm:inset-y-0 sm:left-[-2.70rem] sm:my-auto sm:ml-0"
                      ></div>
                    </div>
                  </li>
                  <li>
                    <div className="relative">
                      <input
                        hidden=""
                        className="peer"
                        type="radio"
                        name="devs"
                        id="devs5"
                      />
                      <label
                        for="devs5"
                        className="block cursor-pointer rounded-full bg-sky-50 py-2 px-4 text-center text-sky-800 peer-checked:text-sky-600 peer-checked:ring-1 peer-checked:ring-sky-500"
                      >
                        <span className="mx-auto block w-max text-sm font-semibold">
                          5 developers
                        </span>
                      </label>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[-2.20rem] z-[1] mx-auto h-6 w-6 scale-0 rounded-full border-8 border-white bg-sky-500 transition peer-checked:scale-100 sm:inset-y-0 sm:left-[-2.70rem] sm:my-auto sm:ml-0"
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
