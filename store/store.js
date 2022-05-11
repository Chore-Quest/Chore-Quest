import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/householdChores'
import singleChoreReducer from './features/singleChore'

const store = configureStore({
  reducer: {
    allChores: choresReducer,
    singleChore: singleChoreReducer,
  },
})

export default store
