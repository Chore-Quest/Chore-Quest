import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'
import { toast } from 'react-toastify'

const initialState = {
  profile: {},
  dynamicProfile: {},
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
      // console.log('*******************')
      // console.log(profile, 'from single profile thunk')
      // console.log('*******************')
      return profile
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

export const fetchDynamicSingleProfile = createAsyncThunk(
  'profiles/fetchDynamicSingleProfile',
  async (userId) => {
    console.log(userId, 'this is id from thunk')
    try {
      let { data: profile } = await supabase
        .from('profiles')
        .select(
          `*, chores (
          *
        ) `
        )
        .eq('id', userId)
        .single()
      // console.log(profile, 'this is profile')
      // console.log('*******************')
      // console.log(profile, 'from single profile thunk')
      // console.log('*******************')
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
      toast.success('Profile Updated!', {
        position: 'top-center',
      })
      thunkAPI.dispatch(fetchSingleProfile())
    } catch (error) {
      toast.error('Error Updating Profile', {
        position: 'top-center',
      })
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
      .addCase(fetchDynamicSingleProfile.fulfilled, (state, action) => {
        state.profile = state.profile
        state.dynamicProfile = action.payload
        state.loading = false
      })
      .addDefaultCase((state, action) => {})
  },
})

export default profilesSlice.reducer
