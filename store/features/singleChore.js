import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  loading: false,
}

// *** THUNKS *** //

//Fetches all chores associated to that user only
export const fetchSingleUserChores = createAsyncThunk(
  //action type string
  'chores/fetchAllChores',
  //callback function
  async (thunkAPI) => {
    const user = supabase.auth.user()
    try {
      let { data: userID } = await supabase
        .from('profiles')
        .select(`id`)
        .eq('id', user.id)
        .single()

      let { data: chores } = await supabase
        .from('responsibility')
        .select(
          `chore_id, chores (
          *
        ) `
        )
        .eq('profile_id', userID.id)
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
const singleUserChoresSlice = createSlice({
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
