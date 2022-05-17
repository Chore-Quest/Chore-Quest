import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  chore: [],
  unassigned: [],
  loading: true,
}
//ADDS A CHORE FOR THE USER'S HOSUEHOLD
export const createResponsibility = createAsyncThunk(
  'responsibilities/addResponsibility',
  async (responsibility, thunkAPI) => {
    try {
      let { chore_id, household_id, profile_id } = responsibility
      //add the chore to the database
      let { data: newResp } = await supabase
        .from('responsibility') // Select the Table
        .insert([
          {
            chore_id,
            household_id,
            profile_id,
          },
        ])
      alert('Responsibility attached!')
      thunkAPI.dispatch(fetchUnassigned(chore_id))
      thunkAPI.dispatch(fetchResponsiblity(chore_id))
      return newResp
      //dispatch fetchALlChores to update the state from db
      // thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      alert('Unable to add Responsibility')
      return error
    }
  }
)

export const fetchUnassigned = createAsyncThunk(
  'responsibilities/unassigned',
  // fetch single Chore
  async (choreId, thunkAPI) => {
    // Find chores and user assigned to this chore
    try {
      let { data: chore } = await supabase
        .from('chores')
        .select(`*, profiles(*)`)
        .eq('id', choreId)
        .single()

      const user = supabase.auth.user()
      let { data: houseHoldId } = await supabase
        .from('profiles')
        .select('household_id')
        .eq('id', user.id)
        .single()
      // Find all users attached to his household
      let { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .eq('household_id', houseHoldId.household_id)

      // Extract IDs
      function extractAllIds(profiles) {
        const profileID = []
        for (let i = 0; i < profiles.length; i++) profileID.push(profiles[i].id)
        return profileID
      }
      // Extract all the ids of members currently assigned to this chore
      const assignedID = extractAllIds(chore.profiles)

      // Only return the profiles that are not currently assigned to this chore
      const unAssigned = profiles.filter(
        (profile) => !assignedID.includes(profile.id)
      )
      return unAssigned
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
// async (thunkAPI) => {
//   const user = supabase.auth.user()
//     let { data: houseHoldId } = await supabase
//       .from('profiles')
//       .select('household_id')
//       .eq('id', user.id)
//       .single()

//     let { data: profiles } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('household_id', houseHoldId.household_id)

export const fetchResponsiblity = createAsyncThunk(
  //action type string
  'responsibility/fetchResponsibility',
  async (choreId, thunkAPI) => {
    try {
      let { data: chore } = await supabase
        .from('responsibility')
        .select(`*, profiles(*)`)
        .eq('chore_id', choreId)
      // console.log(chore, ' responsibilities chore')
      return chore
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

export const deleteResponsibility = createAsyncThunk(
  'chores/deleteChore',
  async ({ profileId, choreId }, thunkAPI) => {
    try {
      //delete the chore
      await supabase.from('responsibility').delete().eq('id', profileId)
      thunkAPI.dispatch(fetchUnassigned(choreId))
      thunkAPI.dispatch(fetchResponsiblity(choreId))
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// export const fetchSingleChore = createAsyncThunk(
//   //action type string
//   'singleChore/fetchSingleChore',
//   async (choreId, thunkAPI) => {
//     console.log(choreId, 'this is choreId thunk')
//     try {
//       let { data: chore } = await supabase
//         .from('chores')
//         .select(`*, profiles(*)`)
//         .eq('id', choreId)
//         .single()
//       console.log(chore, 'this is chore in thunk')
//       return chore
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }
// )

// ***Slice Creator*** //
const responsibilitySlice = createSlice({
  name: 'responsibility',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponsiblity.fulfilled, (state, action) => {
        state.loading = false
        state.chore = [...action.payload]
      })
      .addCase(fetchUnassigned.fulfilled, (state, action) => {
        state.loading = false
        state.unassigned = action.payload
      })
    // .addCase(createResponsibility.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.unassigned = state.unassigned.filter((user) => {
    //     user.id !== action.payload.id
    //   })
    // })
    // .addDefaultCase((state, action) => {})
  },
})

export default responsibilitySlice.reducer
