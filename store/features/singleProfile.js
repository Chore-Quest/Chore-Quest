import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  profile: {},
  loading: false,
}

// *** THUNKS *** //
// fetch single profile
export const fetchSingleProfile = createAsyncThunk(
  'profiles/fetchSingleProfile',
  async (thunkAPI) => {
    const user = supabase.auth.user()
    try {
      let { data: profile } = await supabase
        .from('profiles')
        .select(
          `*, chores (
          *
        ) `
        )
        .eq('id', user.id)
        .single()
      console.log('*******************')
      console.log(profile, 'from single profile thunk')
      console.log('*******************')
      return profile
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// update single profile
export const updateSingleProfile = createAsyncThunk(
  'profiles/updateSingleProfile',
  async (profile, thunkAPI) => {
    const user = supabase.auth.user()
    try {
      await supabase.from('profiles').update(profile).eq('id', user.id)
      thunkAPI.dispatch(fetchSingleProfile())
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// update xp of single profile

// *** SLICES *** //
const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addDefaultCase((state, action) => {})
  },
})

export default profilesSlice.reducer
