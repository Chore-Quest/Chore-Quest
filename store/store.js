import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/adminChores'

const store = configureStore({
  reducer: {
    allChores: choresReducer,
  },
})

export default store
