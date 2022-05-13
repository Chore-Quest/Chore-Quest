import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  loading: false,
}

// *** THUNKS *** //

//FETCH ALL CHORES FOR HOUSEHOLD
export const fetchAllItems = createAsyncThunk(
  //action type string
  'chores/fetchAllChores',
  //callback function
  async () => {
    // const user = supabase.auth.user()
    try {
      //get the householdID
      let { data: items } = await supabase.from('items').select('*')
      items.sort((a, b) => a.xp - b.xp)
      console.log(items, 'itemsss')
      return items
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

const allItemsSlice = createSlice({
  name: 'allItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.loading = false
        state.entities = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})

export default allItemsSlice.reducer
