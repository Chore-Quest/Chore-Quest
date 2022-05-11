import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/adminChores'
import singleChoresReducer from './features/chores'
import singleProfileReducer from './features/singleProfile'

const store = configureStore({
  reducer: {
    allChores: choresReducer,
    singleChore: singleChoresReducer,
    singleProfile: singleProfileReducer,
  },
})

export default store
