import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/adminChores'
import singleChoresReducer from './features/chores'

const store = configureStore({
  reducer: {
    allChores: choresReducer,
    singleChore: singleChoresReducer,
  },
})

export default store
