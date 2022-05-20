import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserItems } from '../store/features/itemInventory'
import styled from 'styled-components'

export default function Items() {
  const dispatch = useDispatch()
  const { userItems: items } = useSelector((store) => store)
  useEffect(() => {
    dispatch(fetchUserItems())
  }, [])

  return (
    <div className="h-auto">
      <h1 className="mb-2 flex justify-center">Inventory</h1>
      <div className="frosted grid rounded-2xl border-slate-900 p-5 md:grid-cols-4">
        {items.entities.map((item) => (
          <>
            {/* <div
              key={item.id}
              className="relative flex cursor-grab flex-col items-center justify-center rounded-xl border border-white p-5 text-white"
            >
              <h2>{item.items.name}</h2>
              <img src={item.items.imageURL} className=" object-scale-down" />
            </div> */}
            <div className="mx-auto mt-5 flex h-96 w-60 cursor-grab flex-col rounded-xl border-inherit bg-black drop-shadow-2xl">
              <div className="relative w-full flex-1 flex-col items-center justify-end p-4">
                <div className="absolute top-0 left-0 min-h-full min-w-full overflow-hidden rounded-tr-xl">
                  <div className="absolute -right-28 -top-10 z-10 h-72 w-72 rounded-full bg-gradient-to-tr from-stone-900	 to-blue-500"></div>
                  <img
                    src={item.items.imageURL}
                    className="fixed z-50 rotate-12 object-scale-down"
                  />

                  <div className="absolute bottom-0 flex border-yellow-300 p-5">
                    <h1 className="relative z-40 m-10 bg-gradient-to-r from-amber-200 to-amber-700  bg-clip-text text-4xl  font-extrabold uppercase text-transparent drop-shadow-2xl">
                      {item.items.name}
                      <br />
                      <span className="">+{item.items.xp} XP</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
