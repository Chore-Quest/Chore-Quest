import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  chore: {},
  assignedTo:
  loading: false,
}

// *** THUNKS *** //

//Fetches a single chore from the database using the ID
export const fetchSingleChores = createAsyncThunk(
  //action type string
  'singleChore/fetchSingleChore',
  //callback function
  async (choreId, thunkAPI) => {
    try {
      let { data: chore, error } = await supabase
        .from('chores')
        .select('*',)
        .eq('id', choreId)

      let { data: responsibility, error } = await supabase
        .from('responsibility')
        .select('profile_id')
        .eq('chore_id', choreId)
      console.log(userID.id, 'this is user')

      return chores
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// export const addChore = createAsyncThunk(
//   'chores/addChore',
//   async (chore, thunkAPI) => {
//     try {
//       let { name, notes } = chore
//       //add the chore to the database
//       await supabase
//         .from('chores') // Select the Table
//         .insert([
//           {
//             name,
//             notes,
//             // xp,
//             // isComplete,
//           },
//         ])
//       //dispatch fetchALlChores to update the state from db
//       thunkAPI.dispatch(fetchAllChores())
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }
// )

// export const deleteChore = createAsyncThunk(
//   'chores/deleteChore',
//   async (choreId, thunkAPI) => {
//     try {
//       //delete the chore
//       await supabase.from('chores').delete().eq('id', choreId)
//       //dispatch fetchALlChores to update the state from db
//       thunkAPI.dispatch(fetchAllChores())
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }
// )

// ***Slice Creator*** //
const singleChoreSlice = createSlice({
  name: 'singleChore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUserChores.fulfilled, (state, action) => {
        state.loading = false
        state.entities = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})

export default singleChoreSlice.reducer
