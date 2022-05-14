import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  loading: false,
}

// *** THUNKS *** //
// fetch all profiles from a household
export const fetchAllProfiles = createAsyncThunk(
  'profiles/fetchAllProfiles',
  async (thunkAPI) => {
    const user = supabase.auth.user()
    try {
      let { data: houseHoldId } = await supabase
        .from('profiles')
        .select('household_id')
        .eq('id', user.id)
        .single()

      let { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .eq('household_id', houseHoldId.household_id)
      return profiles
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// *** SLICES *** //
const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProfiles.fulfilled, (state, action) => {
        state.entities = action.payload
        state.loading = false
      })
      .addDefaultCase((state, action) => {})
  },
})
export default profilesSlice.reducer
