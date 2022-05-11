import { configureStore } from '@reduxjs/toolkit'

import choresReducer from './features/householdChores'
import singleChoreReducer from './features/singleChore'
import singleProfileReducer from './features/singleProfile'
import singleHouseholdReducer from './features/houseProfiles'

const store = configureStore({
  reducer: {
    allChores: choresReducer,
    singleChore: singleChoreReducer,
    singleProfile: singleProfileReducer,
    singleHouseholdProfiles: singleHouseholdReducer,
  },
})

export default store
