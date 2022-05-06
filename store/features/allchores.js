import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

// const initialState = []

// const fetchAllChores = createAction('FETCH_ALL_CHORES')

// const allChoresReducer = createReducer([], (builder) => {
//   builder.addCase(fetchAllChores, (state, action) => {
//     return [action.payload]
//   })
// })

// First, create the thunk
export const fetchAllChores = createAsyncThunk(
  'chores/fetchAllChores',
  async (id = 0, thunkAPI) => {
    const { data } = await supabase.from('chores').select()
    return data
  }
)

const choresSlice = createSlice({
  name: 'allChores',
  initialState: {
    loading: 'idle',
    chores: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllChores.fulfilled, (state, action) => {
      state.chores(action.payload)
    })
  },
})

export default choresSlice
