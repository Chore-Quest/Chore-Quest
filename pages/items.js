import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function items() {
  const getItems = async () => {
    // const user = supabase.auth.user()
    let { data } = await supabase.from('items').select(`
  name,
  user_items (
    item_id,
    quantity
  )
`)

    const hasQuantity = (item) => item.quantity
    let items = data.filter((item) => item.user_items.some(hasQuantity))
    console.log(items)
  }

  getItems()

  return (
    <>
      <div>{items && items.map((item) => <div>{item.name}</div>)}</div>
    </>
  )
}
