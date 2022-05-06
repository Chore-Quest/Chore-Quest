import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/allChores'

const store = configureStore({
  reducer: {
    allChores: choresReducer,
  },
})

export default store
