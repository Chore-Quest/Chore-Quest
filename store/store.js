import { configureStore } from '@reduxjs/toolkit'
import choresSlice from './features/allchores'

const store = configureStore({
  reducer: {
    allChores: choresSlice,
  },
})

export default store
