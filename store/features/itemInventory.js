import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  loading: false,
}

// export const getItems = createAsyncThunk(
//   'item/fetchAllItems',
//   async (thunkAPI) => {
//     const user = supabase.auth.user()
//     let { data } = await supabase.from('items').select(`
// name,
// user_items (
//   item_id,
//   quantity
// )
// `)
//   }
// )

// *** THUNKS *** //
// fetch all items for a user

export const fetchUserItems = createAsyncThunk(
  'item/fetchUserItems',
  async (thunkAPI) => {
    const user = supabase.auth.user()
    try {
      let { data } = await supabase
        .from('user_items')
        .select(
          `
        *,
        items (
          name, xp, imageURL
        )
        `
        )
        .eq('profile_id', user.id)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
// export const fetchUserItems = createAsyncThunk(
//   'item/fetchUserItems',
//   async (thunkAPI) => {
//     const user = supabase.auth.user()
//     try {
//       let { data } = await supabase.from('items').select(
//         `
//         name,
//         user_items (
//           item_id,
//           quantity
//         )
//         `
//       )
//       return data
//       // .eq('profile_id', 'da83ba31-45d1-4e0a-afa1-6c0921503f24')
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }
// )

// *** SLICES *** //
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserItems.fulfilled, (state, action) => {
        state.entities = action.payload
        state.loading = false
      })
      .addDefaultCase((state, action) => {})
  },
})
export default itemsSlice.reducer
