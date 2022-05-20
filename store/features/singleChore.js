import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { create } from 'domain'
import { supabase } from '../../client'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const initialState = {
  chore: {},
  loading: true,
}

// *** THUNKS *** //

//Fetches a single chore from the database using the ID
export const fetchSingleChore = createAsyncThunk(
  //action type string
  'singleChore/fetchSingleChore',
  async (choreId, thunkAPI) => {
    try {
      let { data: chore } = await supabase
        .from('chores')
        .select(`*, profiles(*)`)
        .eq('id', choreId)
        .single()
      return chore
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// Updates a single chore in the database using the ID
export const updateSingleChore = createAsyncThunk(
  //action type string
  'singleChore/updateSingleChore',
  async (chore, thunkAPI) => {
    try {
      await supabase.from('chores').update(chore).eq('id', chore.id)
      toast.success('Chore Updated!', {
        position: 'top-center',
      })
      return chore
    } catch (error) {
      toast.error('Error Updating Chore', {
        position: 'top-center',
      })
      console.log(error)
      return error
    }
  }
)

//Delete Chore
export const deleteSingleChore = createAsyncThunk(
  'singleChore/deleteSingleChore',
  async (choreId) => {
    try {
      await supabase.from('chores').delete().eq('id', choreId)
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
        state.chore = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})

export default singleChoreSlice.reducer
