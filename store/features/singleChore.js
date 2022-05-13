import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  item: {},
  assignedTo: [],
  loading: false,
}

// *** THUNKS *** //

//Fetches a single chore from the database using the ID
export const fetchSingleChore = createAsyncThunk(
  //action type string
  'singleChore/fetchSingleChore',
  //callback function
  async (choreId, thunkAPI) => {
    try {
      let { data: item } = await supabase
        .from('chores')
        .select('*')
        .eq('id', choreId)

      let { data: responsibilities } = await supabase
        .from('responsibility')
        .select(`profile_id, profiles(*), chores()`)
        .eq('chore_id', choreId)

      console.log(responsibilities, 'this is responsibilities')

      let assignedTo = []

      const chore = { item, assignedTo }
      console.log(chore)
      return chore
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// ***Slice Creator*** //
const singleChoreSlice = createSlice({
  name: 'singleChore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleChore.fulfilled, (state, action) => {
        state.loading = false
        state.entities = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})

export default singleChoreSlice.reducer
