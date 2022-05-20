import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  householdInfo: {},
  entities: [],
  loading: false,
}

// *** THUNKS *** //
// fetch all profiles from a household
export const fetchAllProfiles = createAsyncThunk(
  'household/fetchAllProfiles',
  async () => {
    const user = supabase.auth.user()
    if (user && user.id) {
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
  }
)

// get info from household_table
export const fetchHouseholdInfo = createAsyncThunk(
  'household/householdInfo',
  async () => {
    const user = supabase.auth.user()
    if (user && user.id) {
      try {
        let { data: userProfile } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', user.id)
          .single()
        let { data: household } = await supabase
          .from('household_table')
          .select(`*`)
          .eq('id', userProfile.household_id)
          .single()
        return household
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
)

fetchHouseholdInfo()

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
      .addCase(fetchHouseholdInfo.fulfilled, (state, action) => {
        state.householdInfo = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})
export default profilesSlice.reducer
