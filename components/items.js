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
    <>
      {items ? (
        <div className="h-auto">
          <h1 className="mb-3 flex items-center justify-around text-center text-4xl font-extrabold uppercase mix-blend-lighten">
            inventory
          </h1>
          <div className="frosted flex shrink flex-wrap rounded-2xl border-slate-900 md:p-5">
            {items.entities.map((item) => (
              <>
                <div className="mx-1 my-1 flex h-24 w-20 cursor-grab flex-col rounded-xl border-inherit bg-black p-2 drop-shadow-2xl md:mx-auto md:my-auto md:mt-5 md:h-96 md:w-72">
                  <div className="relative w-full flex-1 flex-col items-center justify-end p-4">
                    <div className="absolute top-0 left-0 min-h-full min-w-full overflow-hidden rounded-tr-xl">
                      <div className="-top-20 rounded-full bg-gradient-to-tr from-stone-900 to-red-900 md:absolute md:-right-28 md:-top-10 md:z-10 md:h-96 md:w-96"></div>
                      <img
                        src={item.items.imageURL}
                        className="fixed z-40 object-scale-down md:rotate-12"
                      />

                      <div className="absolute flex shrink items-center justify-center border-yellow-300 pt-3 md:bottom-0 md:p-5">
                        <h1 className="relative z-40 shrink bg-gradient-to-r from-amber-200 to-amber-700 bg-clip-text text-sm font-extrabold uppercase leading-none text-transparent drop-shadow-2xl md:m-10 md:text-4xl">
                          {item.items.name}
                          <br />
                          <span className="shrink">+{item.items.xp} XP</span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <h1>Your pack is empty</h1>
      )}
    </>
  )
}
