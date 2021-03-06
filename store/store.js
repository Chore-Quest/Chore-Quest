import { configureStore, createSelector } from '@reduxjs/toolkit'
import choresReducer from './features/householdChores'
import singleChoreReducer from './features/singleChore'
import singleProfileReducer from './features/singleProfile'
import singleHouseholdReducer from './features/houseProfiles'
import allItemsReducer from './features/itemTiers'
import responsibilityReducer from './features/responsibilities'
import userItemReducer from './features/itemInventory'
import singleUserItemReducer from './features/singleUserItem'

const store = configureStore({
  reducer: {
    allClanChores: choresReducer,
    singleChore: singleChoreReducer,
    singleProfile: singleProfileReducer,
    singleHouseholdProfiles: singleHouseholdReducer,
    allItems: allItemsReducer,
    responsibility: responsibilityReducer,
    userItems: userItemReducer,
    singleUserItem: singleUserItemReducer,
  },
})

export default store
