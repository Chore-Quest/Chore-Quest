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

export const assignUsersItem = createAsyncThunk(
  //action type string
  'item/assignUsersItem',
  //callback function
  async ({ itemID, assignedProfiles }) => {
    try {
      //get the householdID
      let { data: item } = await supabase
        .from('items')
        .select('*')
        .eq('id', itemID)
        .single()
      console.log(item, 'this is item')
      assignedProfiles.map(async (profile) => {
        const { data: something } = await supabase
          .from('user_items')
          .insert([
            { item_id: item.id, profile_id: profile.profile_id, xp: item.xp },
          ])
        console.log(profile.profiles.personalXP, 'this is personalXP')
        let newXP = profile.profiles.personalXP + item.xp
        console.log(item.xp, 'this is item.xp')
        console.log(newXP, 'this is newXP')
        console.log(profile.profile_id, 'this is profile_id')
        const { data } = await supabase
          .from('profiles')
          .update({ personalXP: newXP })
          .eq('id', profile.profile_id)
      })
      // return item
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

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
