import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  filtered: [],
  loading: false,
}

// *** THUNKS *** //

//FETCH ALL CHORES FOR HOUSEHOLD
export const fetchAllChores = createAsyncThunk(
  //action type string
  'chores/fetchAllChores',
  //callback function
  async () => {
    const user = supabase.auth.user()
    try {
      //get the householdID
      let { data } = await supabase
        .from('profiles')
        .select(`household_id`)
        .eq('id', user.id)
        .single()
      const householdId = data.household_id
      let { data: chores, error } = await supabase
        .from('chores')
        .select(`*, profiles(*)`)
        .eq('household_id', householdId)
      return chores
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

//ADDS A CHORE FOR THE USER'S HOSUEHOLD
export const createChore = createAsyncThunk(
  'chores/addChore',
  async (chore, thunkAPI) => {
    try {
      let { name, notes, household_id, item, profile_id } = chore
      //add the chore to the database
      const newChore = await supabase
        .from('chores') // Select the Table
        .insert([
          {
            name,
            notes,
            household_id,
            item,
            // xp,
            // isComplete,
          },
        ])
      const chore_id = newChore.body[0].id
      console.log(newChore.body[0].id, 'this chore was just created')
      if (profile_id.length > 0) {
        await supabase.from('responsibility').insert([
          {
            profile_id,
            household_id,
            chore_id,
          },
        ])
      }

      alert('A Chore has been added!')
      //dispatch fetchALlChores to update the state from db
      thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      alert('Unable to add Chore')
      return error
    }
  }
)

// export const createChore = createAsyncThunk(
//   'chores/createChore',
//   async (chore, thunkAPI) => {
//     const user = supabase.auth.user()
//     try {
//       let { data } = await supabase
//         .from('profiles')
//         .select(`household_id`)
//         .eq('id', user.id)
//       const household_id = data.household_id
//       let { name, notes } = chore
//       //add the chore to the database
//       const res = await supabase.from('chores').insert([
//         {
//           name,
//           notes,
//           household_id,
//         },
//       ])
//       console.log('***************')
//       console.log('Server Response from createChore Thunk:')
//       console.log(res)
//       console.log(
//         'createChore Thunk Says: "Dispatching Fetch All Household Chores..."'
//       )
//       console.log('***************')
//       //dispatch fetchALlChores to update the state from db
//       thunkAPI.dispatch(fetchAllChores())
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }
// )

export const deleteChore = createAsyncThunk(
  'chores/deleteChore',
  async (choreId, thunkAPI) => {
    try {
      //delete the chore
      const res = await supabase.from('chores').delete().eq('id', choreId)
      console.log('***************')
      console.log('Server Response from deleteChore Thunk:')
      console.log(res)
      console.log(
        'deleteChore Thunk Says: "Dispatching Fetch All Household Chores..."'
      )
      console.log('***************')
      //dispatch fetchALlChores to update the state from db
      thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// ***Slice Creator*** //
const choresSlice = createSlice({
  name: 'allChores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChores.fulfilled, (state, action) => {
        state.loading = false
        state.entities = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})

export default choresSlice.reducer

//creates a memoized selector based on the filter input
export const getFilteredChores = createSelector(
  [
    (state) => state.chores,
    (state, category) => category,
    (state, filter) => filter,
  ],
  (chores) => chores.filter((chore) => chore.category === filter)
)
