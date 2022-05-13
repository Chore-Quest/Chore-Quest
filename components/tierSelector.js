import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllItems } from '../store/features/itemTiers'

export default function TierSelector() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllItems())
  }, [])

  const { allItems } = useSelector((store) => store)
  const { entities: items } = allItems

  // const newArr = items.sort((a, b) => a.xp - b.xp)
  // const sortItems = (array) => {

  //   return newArr
  // }

  // console.log(items.sort((a, b) => a.xp - b.xp))

  console.log(items, 'items')
  return (
    <select className="select w-full max-w-xs">
      <option disabled selected>
        Select Tier
      </option>
      {items.map((item) => (
        <option
          key={item.id}
        >{`Tier: ${item.tier} ${item.name} ${item.xp} XP`}</option>
      ))}
    </select>
  )
}
