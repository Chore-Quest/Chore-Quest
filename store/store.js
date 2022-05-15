import { configureStore, createSelector } from '@reduxjs/toolkit'
import choresReducer from './features/householdChores'
import singleChoreReducer from './features/singleChore'
import singleProfileReducer from './features/singleProfile'
import singleHouseholdReducer from './features/houseProfiles'
import allItemsReducer from './features/itemTiers'

const store = configureStore({
  reducer: {
    allClanChores: choresReducer,
    singleChore: singleChoreReducer,
    singleProfile: singleProfileReducer,
    singleHouseholdProfiles: singleHouseholdReducer,
    allItems: allItemsReducer,
  },
})

export default store

export const getAllClanChores = (store) => store.allClanChores
export const getFilter = (store) => store.filter
export const getCriteria = (store) => store.criteria

//creates a memoized selector based on the filter input
export const getFilteredChores = createSelector(
  [getAllClanChores, getFilter, getCriteria],
  (allClanChores, filter, criteria) => {
    console.log(allClanChores, 'this is all clan chores')
    console.log(filter, 'this is filter')
    console.log(criteria, 'this is criteria')
    switch (filter) {
      case 'IS_COMPLETE':
        return allClanChores.filter((chore) => chore.isComplete == criteria)
      case 'PROFILE_ID':
        return allClanChores.filter((chore) => {
          if (chore.profiles[0]) {
            chore.profiles.filter((profile) => profile.id === criteria)
          }
        })
      default:
        return allClanChores
    }
  }
)
