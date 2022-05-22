import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  data: {},
  loading: false,
}

// *** THUNKS *** //
// fetch a single item
export const fetchSingleUserItem = createAsyncThunk(
  'item/fetchSingleUserItem',
  async (userItemId) => {
    if (userItemId) {
      try {
        let { data: user_items, error } = await supabase
          .from('user_items')
          .select(`*, items(*)`)
          .eq('id', userItemId)
          .single()
        error && console.log(error)
        return user_items
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
)

// *** SLICES *** //
const singleUserItemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUserItem.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addDefaultCase((state, action) => {})
  },
})
export default singleUserItemSlice.reducer
