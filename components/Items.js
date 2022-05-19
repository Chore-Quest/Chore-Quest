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
    <>
      <div>
        {items.entities.map((item) => (
          <div>
            {item.items.name}
            <img src={item.items.imageURL} />
          </div>
        ))}
      </div>
    </>
  )
}
