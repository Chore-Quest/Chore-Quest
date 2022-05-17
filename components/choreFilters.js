import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateFilterType,
  updateFilterCriteria,
} from '../store/features/householdChores'

export default function ChoreFilters() {
  let { filterType, filterCriteria } = useSelector(
    (store) => store.allClanChores
  )
  const dispatch = useDispatch()
  const ALL_CHORES = 'ALL_CHORES'
  const IS_COMPLETE = 'IS_COMPLETE'
  const IS_INCOMPLETE = 'IS_INCOMPLETE'
  const PROFILE_ID = 'PROFILE_ID'
  const UNASSIGNED = 'UNASSIGNED'

  function handleFilterChange(type, criteria) {
    dispatch(updateFilterType(type))
    dispatch(updateFilterCriteria(criteria))
  }

  return (
    <>
      <div className="my-3 flex flex-row justify-center">
        <select
          className="select"
          onChange={(e) =>
            handleFilterChange(e.target.value, e.target.criteria)
          }
        >
          <option value={ALL_CHORES} criteria={0}>
            All Chores
          </option>
          <option value={IS_INCOMPLETE} criteria={0}>
            Incomplete
          </option>
          <option value={IS_COMPLETE} criteria={0}>
            Completed
          </option>
          <option value={UNASSIGNED} criteria={0}>
            Unassigned
          </option>
        </select>
      </div>
    </>
  )
}

// <ul className="menu menu-horizontal w-full justify-around px-4">
// <li>
//   <a onClick={() => handleClick(IS_INCOMPLETE, true)}>
//     <div className="tooltip" data-tip="incomplete">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth="2"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </div>
//   </a>
// </li>
// <li>
//   <a onClick={() => handleClick(IS_COMPLETE, true)}>
//     <div className="tooltip" data-tip="completed">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </div>
//   </a>
// </li>
// <li>
//   <a>
//     <div className="tooltip" data-tip="users">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//         />
//       </svg>
//     </div>
//   </a>
// </li>
// <li>
//   <a onClick={() => handleClick(UNASSIGNED, true)}>
//     <div className="tooltip" data-tip="unassigned">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth="2"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//     </div>
//   </a>
// </li>
// </ul>
