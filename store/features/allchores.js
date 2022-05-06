import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  loading: false,
}

// First, create the thunk
export const fetchAllChores = createAsyncThunk(
  //action type string
  'chores/fetchAllChores',
  //callback function
  async (thunkAPI) => {
    try {
      const { data } = await supabase.from('chores').select()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

const choresSlice = createSlice({
  name: 'allChores',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllChores.pending]: (state) => {
      state.loading = true
    },
    [fetchAllChores.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload
    },
    [fetchAllChores.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default choresSlice.reducer
