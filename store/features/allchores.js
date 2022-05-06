import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

// First, create the thunk
export const fetchAllChores = createAsyncThunk(
  'fetchAllChores',
  async (id = 0, thunkAPI) => {
    const { data } = await supabase.from('chores').select()
    console.log()
    console.log(data)
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
    builder
      .addCase(fetchAllChores, (state, action) => {
        state.chores(action.payload)
      })
      .addDefaultCase((state, action) => {})
  },
})

export default choresSlice.reducer
