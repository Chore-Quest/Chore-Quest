import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

//ACTION CREATORS
// function fetchAllChores(chores) {
//   return {
//     type: 'ADD_TODO',
//     chores
//   }
// }

const fetchAllChores = createAction('FETCH_ALL_CHORES')

const initialState = []

const todosReducer = createReducer([], (builder) => {
  builder.addCase('FETCH_ALL_CHORES', (state, action) => {
    // "mutate" the array by calling push()
    state.push(action.payload)
  })
})
