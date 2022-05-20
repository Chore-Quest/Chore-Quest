import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserItems } from '../store/features/itemInventory'

export default function Items() {
  const dispatch = useDispatch()
  const { userItems: items } = useSelector((store) => store)
  useEffect(() => {
    dispatch(fetchUserItems())
  }, [])

  console.log(items, 'item')

  return (
    <div className="h-screen">
      <h1 className="mb-2 flex justify-center">Inventory</h1>
      <div className="grid grid-flow-col grid-cols-8 gap-2 border p-2">
        {items.entities.map((item) => (
          <div key={item.id} className="border border-white p-5">
            <h2>{item.items.name}</h2>
            <img src={item.items.imageURL} className=" object-scale-down" />
          </div>
        ))}
      </div>
    </div>
  )
}
