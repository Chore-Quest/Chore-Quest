import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { create } from 'domain'
import { supabase } from '../../client'
import { toast } from 'react-toastify'
import { Router, useRouter } from 'next/router'

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
    // console.log(choreId, 'this is choreId thunk')
    try {
      let { data: chore } = await supabase
        .from('chores')
        .select(`*, profiles(*)`)
        .eq('id', choreId)
        .single()
      // console.log(chore, 'this is chore in thunk')
      return chore
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

//Updates a single chore in the database using the ID
export const updateSingleChore = createAsyncThunk(
  //action type string
  'singleChore/updateSingleChore',
  async (chore, thunkAPI) => {
    // console.log(chore, 'this is chore in thunk')
    try {
      await supabase.from('chores').update(chore).eq('id', chore.id)
      toast.success('Chore Updated!', {
        position: 'top-center',
      })
      Router.push('/chores')
      console.log('Chore from Update chore', chore)
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
